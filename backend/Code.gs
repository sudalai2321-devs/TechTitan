/**
 * ============================================================
 * TECH TITANS - Student Portal Backend (Google Apps Script)
 * ============================================================
 * 
 * SETUP:
 * 1. Create a Google Sheet with tabs: "Students", "Queries", "AssociationFeedback", "EventFeedback", "Suggestions"
 * 2. In "Students" tab, add headers in Row 1:
 *    RegisterNo | Name | Department | Year | Password | Email | Status
 * 3. Paste the student data (RegisterNo and Name columns). Leave Password column EMPTY.
 * 4. Go to Extensions > Apps Script > paste this code > Deploy as Web App.
 * 5. Copy the Web App URL into your frontend .env file.
 * 
 * AUTHENTICATION FLOW:
 * - First login: Student enters RegisterNo only → system finds their name
 *   → prompts them to SET a new password.
 * - Subsequent logins: Student enters RegisterNo + Password → normal login.
 */

const SHEET_NAMES = {
  STUDENTS: 'Students',
  QUERIES: 'Queries',
  FEEDBACK_ASSOC: 'AssociationFeedback',
  FEEDBACK_EVENT: 'EventFeedback',
  SUGGESTIONS: 'Suggestions',
};

// Column indices (0-based) in Students sheet
const COL = {
  REGISTER_NO: 0,  // A
  NAME: 1,          // B
  DEPARTMENT: 2,    // C
  YEAR: 3,          // D
  PASSWORD: 4,      // E
  EMAIL: 5,         // F
  STATUS: 6,        // G
};

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Tech Titans API is running.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = e.parameter.action || body.action;
    
    let result = { success: false, message: 'Unknown action' };

    switch (action) {
      case 'checkRegister':
        result = handleCheckRegister(body);
        break;
      case 'setPassword':
        result = handleSetPassword(body);
        break;
      case 'login':
        result = handleLogin(body);
        break;
      case 'changePassword':
        result = handleChangePassword(body);
        break;
      case 'submitQuery':
        result = handleSubmitQuery(body);
        break;
      case 'submitAssociationFeedback':
        result = handleSubmitFeedback(body, SHEET_NAMES.FEEDBACK_ASSOC);
        break;
      case 'submitEventFeedback':
        result = handleSubmitFeedback(body, SHEET_NAMES.FEEDBACK_EVENT);
        break;
      case 'submitSuggestion':
        result = handleSubmitFeedback(body, SHEET_NAMES.SUGGESTIONS);
        break;
      default:
        result = { success: false, message: 'Action not found: ' + action };
    }

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      message: 'Server Error: ' + error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// =========================================================================
// AUTHENTICATION HANDLERS
// =========================================================================

/**
 * Step 1: Check if register number exists and whether password is already set.
 * Returns: { success, needsSetup, studentName }
 */
function handleCheckRegister(data) {
  const { registerNo } = data;
  if (!registerNo) return { success: false, message: 'Register number is required.' };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.STUDENTS);
  if (!sheet) return { success: false, message: 'Database error. Contact admin.' };

  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][COL.REGISTER_NO]).trim() === String(registerNo).trim()) {
      const name = rows[i][COL.NAME];
      const password = String(rows[i][COL.PASSWORD] || '').trim();
      const hasPassword = password.length > 0;

      return {
        success: true,
        studentName: name,
        needsSetup: !hasPassword,  // true = first time, needs to set password
      };
    }
  }

  // Don't reveal whether register number exists or not
  return { success: false, message: 'Invalid Register Number.' };
}

/**
 * Step 2 (first time): Set password for a new student.
 */
function handleSetPassword(data) {
  const { registerNo, password } = data;
  if (!registerNo || !password) return { success: false, message: 'Missing fields.' };
  if (password.length < 4) return { success: false, message: 'Password must be at least 4 characters.' };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.STUDENTS);
  if (!sheet) return { success: false, message: 'Database error.' };

  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][COL.REGISTER_NO]).trim() === String(registerNo).trim()) {
      // Check if password already exists (prevent overwriting)
      const existingPassword = String(rows[i][COL.PASSWORD] || '').trim();
      if (existingPassword.length > 0) {
        return { success: false, message: 'Password already set. Please login.' };
      }

      // Set the password (row index is i+1 because Sheets is 1-indexed)
      sheet.getRange(i + 1, COL.PASSWORD + 1).setValue(password);
      sheet.getRange(i + 1, COL.STATUS + 1).setValue('Active');

      return {
        success: true,
        message: 'Password set successfully!',
        user: {
          registerNo: String(rows[i][COL.REGISTER_NO]).trim(),
          name: rows[i][COL.NAME],
          department: rows[i][COL.DEPARTMENT] || 'Computer Science',
          year: rows[i][COL.YEAR] || '2nd Year',
          email: rows[i][COL.EMAIL] || '',
        }
      };
    }
  }

  return { success: false, message: 'Invalid Register Number.' };
}

/**
 * Normal login (student already has password set).
 */
function handleLogin(data) {
  const { registerNo, password } = data;
  if (!registerNo || !password) return { success: false, message: 'Missing credentials.' };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.STUDENTS);
  if (!sheet) return { success: false, message: 'Database error.' };

  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][COL.REGISTER_NO]).trim() === String(registerNo).trim()) {
      const storedPassword = String(rows[i][COL.PASSWORD] || '').trim();

      if (storedPassword.length === 0) {
        return { success: false, message: 'Please set your password first.', needsSetup: true };
      }

      if (storedPassword === String(password).trim()) {
        return {
          success: true,
          user: {
            registerNo: String(rows[i][COL.REGISTER_NO]).trim(),
            name: rows[i][COL.NAME],
            department: rows[i][COL.DEPARTMENT] || 'Computer Science',
            year: rows[i][COL.YEAR] || '2nd Year',
            email: rows[i][COL.EMAIL] || '',
          }
        };
      } else {
        return { success: false, message: 'Invalid Register Number or Password.' };
      }
    }
  }

  return { success: false, message: 'Invalid Register Number or Password.' };
}

/**
 * Change password (for logged-in students).
 */
function handleChangePassword(data) {
  const { registerNo, oldPassword, newPassword } = data;
  if (!registerNo || !oldPassword || !newPassword) return { success: false, message: 'All fields required.' };
  if (newPassword.length < 4) return { success: false, message: 'New password must be at least 4 characters.' };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.STUDENTS);
  if (!sheet) return { success: false, message: 'Database error.' };

  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][COL.REGISTER_NO]).trim() === String(registerNo).trim()) {
      if (String(rows[i][COL.PASSWORD]).trim() !== String(oldPassword).trim()) {
        return { success: false, message: 'Current password is incorrect.' };
      }
      sheet.getRange(i + 1, COL.PASSWORD + 1).setValue(newPassword);
      return { success: true, message: 'Password changed successfully!' };
    }
  }

  return { success: false, message: 'Student not found.' };
}

// =========================================================================
// DATA HANDLERS
// =========================================================================

function handleSubmitQuery(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.QUERIES);
  if (!sheet) return { success: false, message: 'Database error.' };

  const queryId = 'TT-QRY-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));
  const timestamp = new Date().toISOString();

  sheet.appendRow([
    queryId,
    timestamp,
    data.registerNo || '',
    data.name || '',
    data.year || '',
    data.subject || '',
    data.queryType || '',
    data.question || '',
    'Pending',
    '' // Admin Response
  ]);

  return { success: true, id: queryId, message: 'Query submitted.' };
}

function handleSubmitFeedback(data, sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) return { success: false, message: 'Database error.' };

  const timestamp = new Date().toISOString();
  
  // Store all data as JSON in a single column for flexibility
  sheet.appendRow([
    timestamp,
    data.registerNo || '',
    JSON.stringify(data)
  ]);

  return { success: true, message: 'Feedback submitted. Thank you!' };
}
