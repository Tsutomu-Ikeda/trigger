echo "========================="
echo "===== /api/register ====="
echo "========================="

curl -X POST -H "Content-Type: application/json" -d '{"name":"ぶっちゃけ　たろう", "email":"buttyake@example.com", "date_of_birth":"2021/3/31","tel_number": "00000000","password": "password","user_type": "student","type_card_url": "buttyake.type.s3","identity_card_url": "buttyake.id.s3","is_authenticated": 0,"affiliation_id":"99a64e20-b36f-4075-a4cd-20764d854635", "affiliation_name": "D 大学"}' localhost:8080/api/register

echo "\n"

echo "========================="
echo "===== /api/register ====="
echo "========================="

curl -X POST -H "Content-Type: application/json" -d '{"name":"worker", "email":"worker@example.com", "date_of_birth":"2020/10/02","tel_number": "00000001","password": "password","user_type": "worker","type_card_url": "worker.type.s3","identity_card_url": "worker.id.s3","is_authenticated": 1,"department":"事業部","position": "社長","comment" :"社長です","affiliation_id":"cfe7725d-7e0a-4e27-96c8-60e00f251e4c", "affiliation_name": "SanSan", "job_id": "b600600e-84f8-423d-8c73-ff565af3ffad" }' localhost:8080/api/register
echo "\n"

echo "========================="
echo "===== /api/login ========"
echo "========================="

curl -c cookie.txt -X POST -H "Content-Type: application/json" -d '{"email":"yskbsk13@gmail.com", "password": "password"}' localhost:8080/api/login

echo "=========================="
echo "===== /api/logout ========"
echo "=========================="

curl localhost:8080/api/logout

echo "========================="
echo "===== /api/login ========"
echo "========================="

curl -c cookie.txt -X POST -H "Content-Type: application/json" -d '{"email": "Cq1ByD0QkmagPdb@buttyake-mock.com", "password": "password"}' localhost:8080/api/login

echo "\n"

echo "========================="
echo "===== /api/matching ====="
echo "========================="
# TODO: セッションから user_id が取れてない（ブラウザじゃないので当然）
curl -b cookie.txt localhost:8080/api/matching

echo "\n"

echo "==============================="
echo "===== /api/matching/apply ====="
echo "==============================="

curl -X POST -H "Content-Type: application/json" -d '{"speaker_id":"1f6d2ed9-4caf-419e-8495-6a8275cc5d8f", "listener_id": "f5e983e7-ec1c-4cfb-afc6-604d1f1870c2","apply_comment" :"あいうえお"}' localhost:8080/api/matching/apply

echo "\n"

echo "================================"
echo "===== /api/matching/update ====="
echo "================================"

curl -X POST -H "Content-Type: application/json" -d '{"match_id":"d71490d5-529f-47b1-9522-fa2337", "is_matched": 1,"is_done_meeting":0}' localhost:8080/api/matching/update

echo "\n"

echo "================================"
echo "===== /api/matching/update ====="
echo "================================"

curl -X POST -H "Content-Type: application/json" -d '{"match_id":"e1677027-dabf-430d-9b6b-196e4eb10a49", "is_matched": 1,"is_done_meeting":1}' localhost:8080/api/matching/update

echo "\n"

echo "==============================="
echo "===== /api/company/search ====="
echo "==============================="
# TODO: Schema の JSON かが失敗してる
curl localhost:8080/api/company/search?q=Sansan

echo "\n"

echo "=============================="
echo "===== /api/company/<id> ======"
echo "=============================="
# TODO: 企業の UUID の指定が必要
curl localhost:8080/api/company/81b2f690-4c1e-4460-b105-f55c04fd91c3
