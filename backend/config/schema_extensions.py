from drf_spectacular.extensions import OpenApiAuthenticationExtension
from rest_framework.authentication import TokenAuthentication


class TokenAuthScheme(OpenApiAuthenticationExtension):
    target_class = TokenAuthentication  # 対象の認証クラス
    name = "TokenAuth"  # スキーマ内で使われる名前

    def get_security_definition(self, auto_schema):
        return {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "Token",  # 任意。わかりやすさのために "Token" にしてもOK
        }
