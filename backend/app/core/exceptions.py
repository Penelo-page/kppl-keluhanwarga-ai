from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException


def error_response(status_code: int, message: str, data=None):
    return JSONResponse(
        status_code=status_code,
        content=jsonable_encoder({
            "success": False,
            "statusCode": status_code,
            "message": message,
            "data": data,
        }),
    )


async def validation_error(_: Request, exc: RequestValidationError):
    return error_response(422, "Data yang dikirim tidak valid.", {"errors": exc.errors()})


async def http_error(_: Request, exc: HTTPException):
    return error_response(exc.status_code, str(exc.detail))


async def server_error(_: Request, __: Exception):
    return error_response(500, "Terjadi kesalahan pada server.")


def register_exception_handlers(app: FastAPI):
    app.add_exception_handler(RequestValidationError, validation_error)
    app.add_exception_handler(HTTPException, http_error)
    app.add_exception_handler(Exception, server_error)
