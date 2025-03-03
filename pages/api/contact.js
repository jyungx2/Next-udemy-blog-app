import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    // Store it in a database
    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    // 🖍️ ?retryWrites 전에 작성한 이름이 database 이름으로 지정되어 나타남! (지정 안하면 default: 'test'로 지정됨)
    try {
      client = await MongoClient.connect(
        "mongodb+srv://jiyoungnim:acbnpwcS04pQ5Osr@cluster0.okykg.mongodb.net/my-site?retryWrites=true&w=majority&appName=Cluster0"
      );
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }
    client.close(); // database에 연결 & 데이터를 저장에 성공했으면 리소스 절약/mongoDB 연결수 제한 방지/서버성능 최적화/보안 강화를 위해 연결을 끊어줌!

    res
      .status(201)
      .json({ message: "Successfully stored message!", message: newMessage });
  }
}

export default handler;
