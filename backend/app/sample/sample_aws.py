from services import aws


mail = {
    "to_email": "test-student@example.com",
    "subject": "【匿名メールサービス Buttyake】面談申し込み完了のお知らせ",
    "body": "hoge さんに面談の申し込みを行いました．\n面談確定がなされるまでもうしばらくお待ちください．",
}

ses = aws.SES()
ses.send_email(**mail)
