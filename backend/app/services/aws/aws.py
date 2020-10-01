import os

import boto3

from .base import Base


class SES(Base):
    def __init__(self):
        super().__init__()
        self.client = boto3.client(
            "ses",
            aws_access_key_id=self.access_key,
            aws_secret_access_key=self.secret_key,
            region_name=self.region,
        )

    def send_email(self, to_email: str, subject: str, body) -> None:
        self.client.send_email(
            Source=self.email,
            Destination={"ToAddresses": [to_email]},
            Message={
                "Subject": {"Data": subject, "Charset": "UTF-8"},
                "Body": {"Text": {"Data": body, "Charset": "UTF-8"}},
            },
        )
