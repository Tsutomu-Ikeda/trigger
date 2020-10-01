from services.twilio import TwilioClient


twilio = TwilioClient()

call = twilio.client.calls.create(
    url="http://demo.twilio.com/docs/voice.xml",
    to="+818054473740",
    from_="+12056229055",
)

print(call.sid)
