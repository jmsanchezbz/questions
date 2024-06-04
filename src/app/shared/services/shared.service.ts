import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

export interface ResponseError {
  statusCode: number;
  message: string;
  messageDetail: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

@Injectable({
  providedIn: "root",
})
export class SharedService {
  constructor() {}

  async managementToast(
    element: string,
    validRequest: boolean,
    error?: ResponseError
  ): Promise<void> {
    const toastMsg = document.getElementById(element);
    if (toastMsg) {
      if (validRequest) {
        toastMsg.className = "show requestOk";
        toastMsg.textContent = "Formulario enviado correctamente.";
        await this.wait(2500);
        toastMsg.className = toastMsg.className.replace("show", "");
      } else {
        toastMsg.className = "show requestKo";
        if (error?.messageDetail) {
          toastMsg.textContent =
            "Error on form submitted, show logs. Message: " +
            error?.message +
            ". Message detail: " +
            error?.messageDetail +
            ". Status code: " +
            error?.statusCode;
        } else {
          toastMsg.textContent =
            "Error on form submitted, show logs. Message: " +
            error?.message +
            ". Status code: " +
            error?.statusCode;
        }

        await this.wait(2500);
        toastMsg.className = toastMsg.className.replace("show", "");
      }
    }
  }

  errorLog(error: ResponseError): void {
    console.error("path:", error.path);
    console.error("timestamp:", error.timestamp);
    console.error("message:", error.message);
    console.error("messageDetail:", error.messageDetail);
    console.error("statusCode:", error.statusCode);
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  from(response: HttpErrorResponse): ResponseError {
    console.log(response);

    const responseError: ResponseError = {
      statusCode: response.status,
      message: response.message || "Unknown Error",
      messageDetail:
        response.error.message +
        ": " +
        (response.error.errors
          ? this.getErrorMessages(response.error.errors)
          : ""),
      code: response.status + "",
      timestamp: new Date().toISOString(),
      path: response.url,
      method: "",
    };
    return responseError;
  }

  private getErrorMessages(errors) {
    const errorMessages = [];
    for (const field in errors) {
      if (errors.hasOwnProperty(field) && Array.isArray(errors[field])) {
        errors[field].forEach((errorMessage) =>
          errorMessages.push(errorMessage)
        );
      }
    }
    return errorMessages.join(", "); // Join messages with comma separator
  }
}
