## DATA SCHEMA

```
[
  {
    "transactionId": INT UNIQUE,
    "actionType": ENUM (create, update, sign, expire),
    "actionData": PREFIX DESC,
    "timestamp":  YYYY-MM-DD,
    "initiator": {
      "userId": STRING,
      "username": STRING
    },
    "document": {
      "documentId": STRING,
      "title": STRING,
      "description": STRING,
      "expiration": YYYY-MM-DD,
      "status": ENUM (new, signing, released, expired),
      "hash": STRING,
      "url": STRING,
      "signers": [
        {
          "userId": STRING,
          "username": STRING,
          "signed": ENUM (true, false)
        }
      ]
    }
  }
]
```
