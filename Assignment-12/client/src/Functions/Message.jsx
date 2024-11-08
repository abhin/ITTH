import { toast } from "react-toastify";

export const showError = (err) => {
  if (typeof err == "object") {
    err?.errors.forEach((error) => {
      toast.error(error?.msg);
    });
  } else toast.error(err);
};


export const showSucess = (err) => {
  if (typeof err == "object") {
    err?.errors.forEach((error) => {
      toast.success(error?.msg);
    });
  } else toast.success(err);
};
