import axios from "axios";

const API_BASE_URL = "https://rmsb-2wjb.onrender.com/api";

console.log("API Base URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config.url.includes("/auth/register")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) =>
    api.post("/auth/login", {
      phone: credentials.phone,
      password: credentials.password,
      userType: credentials.userType,
    }),
  register: (userData) => {
    const payload = {
      fullName: userData.fullName,
      phone: userData.phone,
      email: userData.email || null,
      block: userData.block,
      houseNo: userData.houseNo,
      ownershipType: userData.ownershipType,
      ownerName: userData.ownerName || null,
      familyMembers: parseInt(userData.familyMembers) || 1,
      carPlate: userData.carPlate || null,
      password: userData.password,
      condominiumId: userData.condominiumId,
    };
    console.log("Registration payload:", payload);
    return api.post("/auth/register", payload);
  },
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data) => api.put("/auth/profile", data),
};

export const residentsAPI = {
  getAll: () => api.get("/residents"),
  getById: (id) => api.get(`/residents/${id}`),
  update: (id, data) => api.put(`/residents/${id}`, data),
  delete: (id) => api.delete(`/residents/${id}`),
};

export const announcementsAPI = {
  getAll: () => api.get("/announcements"),
  getById: (id) => api.get(`/announcements/${id}`),
  create: (data) => api.post("/announcements", data),
  update: (id, data) => api.put(`/announcements/${id}`, data),
  delete: (id) => api.delete(`/announcements/${id}`),
};

export const complaintsAPI = {
  getAll: () => api.get("/complaints"),
  getMy: () => api.get("/complaints/my"),
  getById: (id) => api.get(`/complaints/${id}`),
  create: (data) => api.post("/complaints", data),
  update: (id, data) => api.put(`/complaints/${id}`, data),
  delete: (id) => api.delete(`/complaints/${id}`),
};

export const parkingAPI = {
  getSlots: () => api.get("/parking/slots"),
  getAvailable: () => api.get("/parking/slots/available"),
  createSlot: (data) => api.post("/parking/slots", data),
  createSlots: (data) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return api.post("/parking/slots/bulk", data, config);
  },
  updateSlot: (id, data) => api.put(`/parking/slots/${id}`, data),
  deleteSlot: (id) => api.delete(`/parking/slots/${id}`),
  requestSlot: (data) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return api.post("/parking/request", data, config);
  },
  getMyRequests: () => api.get("/parking/my-requests"),
  getAllRequests: () => api.get("/parking/requests"),
  approveRequest: (id, data) =>
    api.put(`/parking/requests/${id}/approve`, data),
  rejectRequest: (id, data) => api.put(`/parking/requests/${id}/reject`, data),
  payFee: (data) => api.post("/parking/pay", data),
};

export const utilitiesAPI = {
  getAll: () => api.get("/utilities"),
  getById: (id) => api.get(`/utilities/${id}`),
  create: (data) => api.post("/utilities", data),
  pay: (id, data) => api.post(`/utilities/pay/${id}`, data),
  reportIssue: (data) => api.post("/utilities/report", data),
};

export const dashboardAPI = {
  getResident: () => api.get("/dashboard/resident"),
  getAdmin: () => api.get("/dashboard/admin"),
  getSuper: () => api.get("/dashboard/super"),
};

export const financeAPI = {
  getSummary: () => api.get("/finance/summary"),
  getIncome: () => api.get("/finance/income"),
};

export const servicesAPI = {
  getAll: () => api.get("/services"),
  getById: (id) => api.get(`/services/${id}`),
  payFee: (id, data) => api.post(`/services/pay/${id}`, data),
  rate: (id, data) => api.post(`/services/rate/${id}`, data),
};

export const ekubEddirAPI = {
  getAll: () => api.get("/groups"),
  getById: (id) => api.get(`/groups/${id}`),
  create: (data) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return api.post("/groups", data, config);
  },
  join: (id) => api.post(`/groups/${id}/join`),
  approveJoin: (id, requestId) =>
    api.post(`/groups/${id}/approve/${requestId}`),
  rejectJoin: (id, requestId) => api.post(`/groups/${id}/reject/${requestId}`),
  makePayment: (id, data) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return api.post(`/groups/${id}/payment`, data, config);
  },
  getPaymentHistory: (id) => api.get(`/groups/${id}/payments`),
  selectWinner: (id) => api.post(`/groups/${id}/select-winner`),
  sendReminder: (id) => api.post(`/groups/${id}/send-reminder`),
  sendAnnouncement: (id, data) => api.post(`/groups/${id}/announcement`, data),
  getMembers: (id) => api.get(`/groups/${id}/members`),
  getJoinRequests: (id) => api.get(`/groups/${id}/join-requests`),
};

export const condominiumAPI = {
  getAll: () => api.get("/condominiums"),
  create: (data) => api.post("/condominiums", data),
  update: (id, data) => api.put(`/condominiums/${id}`, data),
  delete: (id) => api.delete(`/condominiums/${id}`),
};

export default api;
