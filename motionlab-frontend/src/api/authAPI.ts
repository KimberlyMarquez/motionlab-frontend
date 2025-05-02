import api from ".";

export const teacherLogin = async (id: string, pwd: string) => {
  try {
    const res = await api.post('/auth/teacher', { id, pwd });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else {
      return {
        message: "Error de conexión",
        status: "error",
      };
    }
  }
};