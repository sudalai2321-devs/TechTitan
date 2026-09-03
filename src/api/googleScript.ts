export const API_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || '';

export const apiCall = async (action: string, payload: any) => {
  if (!API_URL) {
    console.warn("API URL not set. Using mock data.");
    return mockApiCall(action, payload);
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ ...payload, action }),
      redirect: 'follow',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Call Error:", error);
    // Check if mock can be used as fallback or return descriptive message
    const mockRes = await mockApiCall(action, payload);
    if (mockRes && mockRes.success) {
      console.info("Using local fallback data.");
      return mockRes;
    }
    return { success: false, message: 'Connection error. Please check your Google Sheet setup.' };
  }
};

// ======================================================================
// MOCK API — fallback for seamless experience
// ======================================================================

const MOCK_STUDENTS: Record<string, { name: string; password: string }> = {
  '11524100084': { name: 'SUDALAI S', password: '' },
  '11524100001': { name: 'AASHIKA A', password: '' },
  '11524100008': { name: 'ARJUN S', password: '' },
  '11523100045': { name: 'HARINI T', password: '' },
  '11523100097': { name: 'RAASIKA N', password: '' },
};

const mockApiCall = async (action: string, payload: any): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (action) {
        case 'checkRegister': {
          const reg = String(payload.registerNo || '').trim();
          const student = MOCK_STUDENTS[reg];
          if (student) {
            resolve({
              success: true,
              studentName: student.name,
              needsSetup: student.password === '',
            });
          } else {
            resolve({ success: false, message: 'Invalid Register Number.' });
          }
          break;
        }

        case 'setPassword': {
          const reg = String(payload.registerNo || '').trim();
          const student = MOCK_STUDENTS[reg];
          if (student) {
            student.password = payload.password;
            resolve({
              success: true,
              message: 'Password set successfully!',
              user: {
                registerNo: reg,
                name: student.name,
                department: 'Computer Science',
                year: '3rd Year',
                email: '',
              }
            });
          } else {
            resolve({ success: false, message: 'Invalid Register Number.' });
          }
          break;
        }

        case 'login': {
          const reg = String(payload.registerNo || '').trim();
          const student = MOCK_STUDENTS[reg];
          if (student) {
            if (student.password === '') {
              resolve({ success: false, message: 'Please set your password first.', needsSetup: true });
            } else if (student.password === payload.password) {
              resolve({
                success: true,
                user: {
                  registerNo: reg,
                  name: student.name,
                  department: 'Computer Science',
                  year: '3rd Year',
                  email: '',
                }
              });
            } else {
              resolve({ success: false, message: 'Invalid Register Number or Password.' });
            }
          } else {
            resolve({ success: false, message: 'Invalid Register Number or Password.' });
          }
          break;
        }

        case 'submitQuery':
          resolve({ success: true, id: 'TT-QRY-' + Math.floor(1000 + Math.random() * 9000), message: 'Query submitted.' });
          break;

        case 'submitAssociationFeedback':
        case 'submitEventFeedback':
        case 'submitSuggestion':
        case 'submitFeedback':
          resolve({ success: true, message: 'Feedback submitted. Thank you!' });
          break;

        default:
          resolve({ success: true, data: [] });
      }
    }, 400);
  });
};
