from app import app


@app.route("/api")
def hello_world():
    return "Hello, World!"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)