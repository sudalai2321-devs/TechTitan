/**
 * ==============================================================================
 * TECH TITANS - STUDENT PORTAL BACKEND & DATABASE AUTO-INITIALIZER
 * ==============================================================================
 * 
 * INSTRUCTIONS:
 * 1. Open a blank Google Sheet.
 * 2. Click "Extensions" -> "Apps Script".
 * 3. Delete everything in Code.gs and paste THIS entire code.
 * 4. In the toolbar, select "setupDatabase" and click "Run" (or refresh your
 *    Google Sheet and click "⚡ Tech Titans Setup" -> "🚀 Initialize / Setup Database").
 * 5. It will AUTOMATICALLY create all tabs, headers, formatting, and load all 95 students!
 * 6. Click "Deploy" -> "New deployment" -> Select type "Web app":
 *    - Description: Tech Titans API
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. Click Deploy -> Copy the Web App URL and use it in your website!
 * ==============================================================================
 */

const SHEET_NAMES = {
  STUDENTS: 'Students',
  QUERIES: 'Queries',
  FEEDBACK_ASSOC: 'AssociationFeedback',
  FEEDBACK_EVENT: 'EventFeedback',
  SUGGESTIONS: 'Suggestions'
};

const COL = {
  REGISTER_NO: 0,
  NAME: 1,
  DEPARTMENT: 2,
  YEAR: 3,
  PASSWORD: 4,
  EMAIL: 5,
  STATUS: 6
};

// ==============================================================================
// 1. AUTO-SETUP DATABASE FUNCTION (Run this once or click custom menu)
// ==============================================================================

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('⚡ Tech Titans Setup')
    .addItem('🚀 Initialize / Setup Database Now', 'setupDatabase')
    .addToUi();
}

function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Setup STUDENTS Sheet
  let studentSheet = ss.getSheetByName(SHEET_NAMES.STUDENTS);
  if (!studentSheet) {
    studentSheet = ss.insertSheet(SHEET_NAMES.STUDENTS);
  }
  
  const studentHeaders = ['RegisterNo', 'Student Name', 'Department', 'Year', 'Password', 'Email', 'Status'];
  
  // Check if headers already exist
  if (studentSheet.getLastRow() === 0) {
    studentSheet.appendRow(studentHeaders);
    
    // Insert all 95 students (Password left blank for first-time setup!)
    const studentsData = getInitialStudentsData();
    studentSheet.getRange(2, 1, studentsData.length, studentsData[0].length).setValues(studentsData);
    
    // Format Students Sheet
    formatSheetHeader(studentSheet, studentHeaders.length);
    studentSheet.setFrozenRows(1);
    studentSheet.autoResizeColumns(1, studentHeaders.length);
  }

  // 2. Setup QUERIES Sheet
  let querySheet = ss.getSheetByName(SHEET_NAMES.QUERIES);
  if (!querySheet) {
    querySheet = ss.insertSheet(SHEET_NAMES.QUERIES);
  }
  const queryHeaders = ['QueryID', 'Timestamp', 'RegisterNo', 'StudentName', 'Year', 'Subject', 'QueryType', 'Question', 'Status', 'AdminResponse'];
  if (querySheet.getLastRow() === 0) {
    querySheet.appendRow(queryHeaders);
    formatSheetHeader(querySheet, queryHeaders.length);
    querySheet.setFrozenRows(1);
    querySheet.autoResizeColumns(1, queryHeaders.length);
  }

  // 3. Setup ASSOCIATION FEEDBACK Sheet
  let assocSheet = ss.getSheetByName(SHEET_NAMES.FEEDBACK_ASSOC);
  if (!assocSheet) {
    assocSheet = ss.insertSheet(SHEET_NAMES.FEEDBACK_ASSOC);
  }
  const assocHeaders = ['Timestamp', 'RegisterNo', 'Rating (1-5)', 'What Liked', 'Improvements', 'RawData'];
  if (assocSheet.getLastRow() === 0) {
    assocSheet.appendRow(assocHeaders);
    formatSheetHeader(assocSheet, assocHeaders.length);
    assocSheet.setFrozenRows(1);
    assocSheet.autoResizeColumns(1, assocHeaders.length);
  }

  // 4. Setup EVENT FEEDBACK Sheet
  let eventSheet = ss.getSheetByName(SHEET_NAMES.FEEDBACK_EVENT);
  if (!eventSheet) {
    eventSheet = ss.insertSheet(SHEET_NAMES.FEEDBACK_EVENT);
  }
  const eventHeaders = ['Timestamp', 'RegisterNo', 'EventName', 'ContentQuality', 'Organization', 'Experience', 'RawData'];
  if (eventSheet.getLastRow() === 0) {
    eventSheet.appendRow(eventHeaders);
    formatSheetHeader(eventSheet, eventHeaders.length);
    eventSheet.setFrozenRows(1);
    eventSheet.autoResizeColumns(1, eventHeaders.length);
  }

  // 5. Setup SUGGESTIONS Sheet
  let suggestSheet = ss.getSheetByName(SHEET_NAMES.SUGGESTIONS);
  if (!suggestSheet) {
    suggestSheet = ss.insertSheet(SHEET_NAMES.SUGGESTIONS);
  }
  const suggestHeaders = ['Timestamp', 'RegisterNo', 'Category', 'Title', 'Description', 'Anonymous', 'RawData'];
  if (suggestSheet.getLastRow() === 0) {
    suggestSheet.appendRow(suggestHeaders);
    formatSheetHeader(suggestSheet, suggestHeaders.length);
    suggestSheet.setFrozenRows(1);
    suggestSheet.autoResizeColumns(1, suggestHeaders.length);
  }

  // Remove default 'Sheet1' if it exists and is empty
  const defaultSheet = ss.getSheetByName('Sheet1');
  if (defaultSheet && defaultSheet.getLastRow() === 0 && ss.getSheets().length > 1) {
    try { ss.deleteSheet(defaultSheet); } catch (e) {}
  }

  Logger.log("Tech Titans Database setup completed successfully!");
}

function formatSheetHeader(sheet, numCols) {
  const headerRange = sheet.getRange(1, 1, 1, numCols);
  headerRange.setBackground('#0A192F') // Deep navy blue
             .setFontColor('#0097FF') // Tech Titans Cyan-Blue
             .setFontWeight('bold')
             .setFontSize(11)
             .setHorizontalAlignment('center');
}

// ==============================================================================
// 2. INITIAL 95 STUDENTS DATA
// ==============================================================================

function getInitialStudentsData() {
  return [
    ["11523100045", "HARINI T", "Computer Science", "3rd Year", "", "", "Active"],
    ["11523100097", "RAASIKA N", "Computer Science", "3rd Year", "", "", "Active"],
    ["11524100001", "AASHIKA A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100002", "ABDUL RASHAD R", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100003", "ABDUR RAHEEF A.J", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100004", "ABINAYA D", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100005", "ABINAYA M", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100006", "AKALYA R", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100007", "AKSHITHA A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100008", "ARJUN S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100009", "ARUL SHINY A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100010", "ARYA A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100011", "ASHWIN P", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100012", "ATCHAYA M", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100013", "AURTHAR X", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100014", "DEEPIKA CHRISTY S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100015", "DEEPIKA R", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100016", "DESIKA M", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100017", "DEVADHARSHINI T", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100018", "DHANALAKSHMI M", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100019", "DHANALAKSHMI S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100020", "DHISHANTH R", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100021", "DHIYAN S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100022", "DINESH A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100023", "DINESHKUMAR R", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100024", "ELAVARASAN M", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100026", "GAYATHRI A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100027", "GAYATHRI G", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100028", "GIRI PRASATH A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100030", "HAKKEEM ALI M", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100031", "HARI PRASAD A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100032", "HARIHARAN N", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100033", "HARIKRISHNAN T", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100034", "HIRUTHICK P", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100035", "JANANI PRIYA S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100036", "JEFFRY D", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100037", "JEFRIN A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100038", "JESUDOSS S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100039", "JHANANI B", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100040", "JINOVA R", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100041", "JOHNU A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100042", "JOSHUA SAMUEL S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100044", "KEERTHANAN K", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100045", "KEM KUMAR K", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100046", "KESAVA KUMAR S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100047", "LATHIGA SHREE K", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100048", "MAHADHARSHINI G", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100049", "MAHALAKSHMI K", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100051", "MANOJKUMAR P", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100052", "MATHUMITHA A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100053", "MOHAMED AASIM S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100054", "MOHAMED HAIF K", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100055", "MOHAMED HANIFA S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100056", "MOHAMED NABEEL T", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100057", "MOHAMED SHAFIL J", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100058", "MOHAMEED ANAS P A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100059", "NAVEEN R", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100060", "NEHASRI B C", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100061", "NIVASHINI S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100062", "PRADEESHWARAN V", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100063", "PRAGADEESHWARAN S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100064", "PRIYANKA A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100065", "RAGAVAN B", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100066", "RENGADURAI A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100067", "RIJO EZRA A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100068", "RITHISH D", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100069", "ROKESH ADAIKKALAM S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100070", "SANTHIYA M", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100071", "SANTHOSH G", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100072", "SARANKUMAR S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100073", "SARUMATHI G", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100074", "SATHIYA S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100075", "SHALINI E", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100076", "SHARU BELLA S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100077", "SHARUK RITHWAN S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100078", "SHEETHAL NIRANJANI S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100079", "SOUNDHARYA S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100080", "SRI SOWMIYA NARAYANAN B", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100081", "SRIMADHAVAN A K", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100082", "SRINATHI P", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100083", "SRINIDHI S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100084", "SUDALAI S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100085", "SURYA A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100086", "SURYAPRAKASH S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100087", "SUSIKUMAR S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100088", "TERANCE REGAN A", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100089", "THANUSHREE N", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100090", "VIGNESH V", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100091", "VISHAL K", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100092", "YASHICA S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100093", "YOGESHWARAN S", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100094", "YUVARAJ K", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524100095", "JEEVABHARATHI P", "Computer Science", "2nd Year", "", "", "Active"],
    ["11524108001", "GIRIDHAR SHAKTHI R G", "Computer Science", "2nd Year", "", "", "Active"]
  ];
}

// ==============================================================================
// 3. API REQUEST HANDLERS (doGet & doPost)
// ==============================================================================

function doGet(e) {
  return createJsonResponse({ 
    success: true, 
    message: 'Tech Titans Portal API is active and ready 🚀' 
  });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = (e.parameter && e.parameter.action) || body.action;
    
    let result = { success: false, message: 'Invalid or missing action' };

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
        result = handleAssociationFeedback(body);
        break;
      case 'submitEventFeedback':
        result = handleEventFeedback(body);
        break;
      case 'submitSuggestion':
        result = handleSuggestion(body);
        break;
      case 'submitFeedback':
        result = handleGenericFeedback(body);
        break;
      default:
        result = { success: false, message: 'Action not found: ' + action };
    }

    return createJsonResponse(result);

  } catch (error) {
    return createJsonResponse({ 
      success: false, 
      message: 'Server Error: ' + error.toString() 
    });
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==============================================================================
// 4. AUTHENTICATION LOGIC
// ==============================================================================

function handleCheckRegister(data) {
  const registerNo = String(data.registerNo || '').trim();
  if (!registerNo) return { success: false, message: 'Register number is required.' };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.STUDENTS);
  if (!sheet) return { success: false, message: 'Students sheet missing. Run setupDatabase first.' };

  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][COL.REGISTER_NO]).trim() === registerNo) {
      const studentName = String(rows[i][COL.NAME]).trim();
      const existingPassword = String(rows[i][COL.PASSWORD] || '').trim();

      return {
        success: true,
        studentName: studentName,
        needsSetup: existingPassword.length === 0 // true if no password is set yet
      };
    }
  }

  return { success: false, message: 'Invalid Register Number.' };
}

function handleSetPassword(data) {
  const registerNo = String(data.registerNo || '').trim();
  const password = String(data.password || '').trim();

  if (!registerNo || !password) return { success: false, message: 'Missing register number or password.' };
  if (password.length < 4) return { success: false, message: 'Password must be at least 4 characters.' };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.STUDENTS);
  if (!sheet) return { success: false, message: 'Students sheet not found.' };

  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][COL.REGISTER_NO]).trim() === registerNo) {
      const existingPassword = String(rows[i][COL.PASSWORD] || '').trim();
      if (existingPassword.length > 0) {
        return { success: false, message: 'Password already set. Please login.' };
      }

      // Save password in column E (index 5 in 1-based indexing)
      sheet.getRange(i + 1, COL.PASSWORD + 1).setValue(password);
      sheet.getRange(i + 1, COL.STATUS + 1).setValue('Active');

      return {
        success: true,
        message: 'Password set successfully!',
        user: {
          registerNo: registerNo,
          name: rows[i][COL.NAME],
          department: rows[i][COL.DEPARTMENT] || 'Computer Science',
          year: rows[i][COL.YEAR] || '2nd Year',
          email: rows[i][COL.EMAIL] || ''
        }
      };
    }
  }

  return { success: false, message: 'Register Number not found.' };
}

function handleLogin(data) {
  const registerNo = String(data.registerNo || '').trim();
  const password = String(data.password || '').trim();

  if (!registerNo || !password) return { success: false, message: 'Enter both Register Number and Password.' };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.STUDENTS);
  if (!sheet) return { success: false, message: 'Students sheet not found.' };

  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][COL.REGISTER_NO]).trim() === registerNo) {
      const storedPassword = String(rows[i][COL.PASSWORD] || '').trim();

      if (storedPassword.length === 0) {
        return { success: false, message: 'Please set your password first.', needsSetup: true };
      }

      if (storedPassword === password) {
        return {
          success: true,
          user: {
            registerNo: registerNo,
            name: rows[i][COL.NAME],
            department: rows[i][COL.DEPARTMENT] || 'Computer Science',
            year: rows[i][COL.YEAR] || '2nd Year',
            email: rows[i][COL.EMAIL] || ''
          }
        };
      } else {
        return { success: false, message: 'Invalid Register Number or Password.' };
      }
    }
  }

  return { success: false, message: 'Invalid Register Number or Password.' };
}

function handleChangePassword(data) {
  const registerNo = String(data.registerNo || '').trim();
  const oldPassword = String(data.oldPassword || '').trim();
  const newPassword = String(data.newPassword || '').trim();

  if (!registerNo || !oldPassword || !newPassword) return { success: false, message: 'All fields are required.' };
  if (newPassword.length < 4) return { success: false, message: 'Password must be at least 4 characters.' };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.STUDENTS);
  if (!sheet) return { success: false, message: 'Students sheet not found.' };

  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][COL.REGISTER_NO]).trim() === registerNo) {
      if (String(rows[i][COL.PASSWORD]).trim() !== oldPassword) {
        return { success: false, message: 'Current password is incorrect.' };
      }
      sheet.getRange(i + 1, COL.PASSWORD + 1).setValue(newPassword);
      return { success: true, message: 'Password updated successfully!' };
    }
  }

  return { success: false, message: 'Student not found.' };
}

// ==============================================================================
// 5. QUERIES & FEEDBACK SUBMISSION
// ==============================================================================

function handleSubmitQuery(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.QUERIES);
  if (!sheet) return { success: false, message: 'Queries sheet not found.' };

  const queryId = 'TT-QRY-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));
  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');

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
    ''
  ]);

  return { success: true, id: queryId, message: 'Your doubt has been submitted successfully.' };
}

function handleAssociationFeedback(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.FEEDBACK_ASSOC);
  if (!sheet) return { success: false, message: 'Feedback sheet not found.' };

  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  sheet.appendRow([
    timestamp,
    data.registerNo || '',
    data.rating || '',
    data.liked || '',
    data.improvement || '',
    JSON.stringify(data)
  ]);

  return { success: true, message: 'Association feedback submitted. Thank you!' };
}

function handleEventFeedback(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.FEEDBACK_EVENT);
  if (!sheet) return { success: false, message: 'Feedback sheet not found.' };

  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  sheet.appendRow([
    timestamp,
    data.registerNo || '',
    data.eventName || '',
    data.contentQuality || '',
    data.organization || '',
    data.experience || '',
    JSON.stringify(data)
  ]);

  return { success: true, message: 'Event feedback submitted. Thank you!' };
}

function handleSuggestion(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.SUGGESTIONS);
  if (!sheet) return { success: false, message: 'Suggestions sheet not found.' };

  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  sheet.appendRow([
    timestamp,
    data.anonymous ? 'Anonymous' : (data.registerNo || ''),
    data.category || '',
    data.title || '',
    data.description || '',
    data.anonymous ? 'Yes' : 'No',
    JSON.stringify(data)
  ]);

  return { success: true, message: 'Suggestion submitted. Thank you!' };
}

function handleGenericFeedback(data) {
  if (data.type === 'association') return handleAssociationFeedback(data);
  if (data.type === 'event') return handleEventFeedback(data);
  if (data.type === 'suggestion') return handleSuggestion(data);
  return { success: true, message: 'Feedback recorded.' };
}
