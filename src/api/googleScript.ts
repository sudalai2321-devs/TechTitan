export const API_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || '';

export const apiCall = async (action: string, payload: any) => {
  if (!API_URL) {
    console.warn("API URL not set. Using mock data. Set VITE_GOOGLE_APPS_SCRIPT_URL in .env");
    return mockApiCall(action, payload);
  }

  try {
    const response = await fetch(`${API_URL}?action=${action}`, {
      method: 'POST',
      body: JSON.stringify({ ...payload, action }),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Call Error:", error);
    throw error;
  }
};

// ======================================================================
// MOCK API — used when VITE_GOOGLE_APPS_SCRIPT_URL is not set
// Simulates the Google Apps Script backend for local development
// ======================================================================

const MOCK_STUDENTS: Record<string, { name: string; password: string }> = {
  '11524100084': { name: 'SUDALAI S', password: '' },
  '11524100001': { name: 'AASHIKA A', password: '' },
  '11524100008': { name: 'ARJUN S', password: '' },
};

const mockApiCall = async (action: string, payload: any): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (action) {
        case 'checkRegister': {
          const student = MOCK_STUDENTS[payload.registerNo];
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
          const student = MOCK_STUDENTS[payload.registerNo];
          if (student) {
            student.password = payload.password;
            resolve({
              success: true,
              message: 'Password set successfully!',
              user: {
                registerNo: payload.registerNo,
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
          const student = MOCK_STUDENTS[payload.registerNo];
          if (student) {
            if (student.password === '') {
              resolve({ success: false, message: 'Please set your password first.', needsSetup: true });
            } else if (student.password === payload.password) {
              resolve({
                success: true,
                user: {
                  registerNo: payload.registerNo,
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
    }, 800);
  });
};
