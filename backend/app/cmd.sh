curl -X POST -H "Content-Type: application/json" -d 
'{
    "name":"ぶっちゃけ　たろう", 
    "email":"buttyake@example.com", 
    "date_of_barth":"2020,10,2,10,00",
    "tel_number": "00000000",
    "password_hash": "password",
    "user_type": "student",
    "type_card_url": "buttyake.type.s3",
    "identity_card_url": "buttyake.id.s3",
    "is_authenticated": 0
}' localhost:8080/api/register

curl -X POST -H "Content-Type: application/json" -d 
'{
    "name":"worker", 
    "email":"worker@example.com", 
    "date_of_barth":"2020,10,2,10,00",
    "tel_number": "00000001",
    "password_hash": "password",
    "user_type": "worker",
    "type_card_url": "worker.type.s3",
    "identity_card_url": "worker.id.s3",
    "is_authenticated": 1,
    "department":"事業部",
    "position": "社長",
    "comment" :"社長です",
    "job_id": ,
}' localhost:8080/api/register

curl -X POST -H "Content-Type: application/json" -d 
'{
    "email":"buttyake@example.com", 
    "password_hash": "password",
}' localhost:8080/api/login

curl localhost:8080/api/matching

curl -X POST -H "Content-Type: application/json" -d 
'{
    "seapker_id":"", 
    "listener_id": "",
   "apply_comment" :"",
}' localhost:8080/api/matching/apply

curl -X POST -H "Content-Type: application/json" -d 
'{
    "match_id":"", 
    "is_matched": 1,
   "is_done_meeting":0,
}' localhost:8080/api/matching/update

curl -X POST -H "Content-Type: application/json" -d 
'{
    "match_id":"", 
    "is_matched": 1,
   "is_done_meeting":1,
}' localhost:8080/api/matching/update

curl localhost:8080/api/company/search?q=Sansan

curl localhost:8080/api/company/1



