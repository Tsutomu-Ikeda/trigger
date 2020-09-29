from app import app


@app.route("/api")
def hello_world():
    return "Hello, World!"


@app.route("/api/company")
def company():
    return "Hello, Company!"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
