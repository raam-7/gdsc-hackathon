# 2Fast2Hack Backend

Backend API structure for 2Fast2Hack application.

## 📁 Project Structure

```
Backend/
├── app/
│   ├── api/
│   │   ├── deps.py              # Auth & DB dependencies
│   │   └── v1/
│   │       ├── router.py        # API router
│   │       └── endpoints/
│   │           ├── users.py     # User CRUD endpoints
│   │           └── items.py     # Item CRUD endpoints
│   ├── core/
│   │   ├── config.py            # Settings (env variables)
│   │   └── security.py          # Password hashing, JWT
│   ├── db/
│   │   ├── base.py              # Model imports for Alembic
│   │   ├── base_class.py        # SQLAlchemy Base
│   │   └── session.py           # DB session management
│   ├── models/
│   │   ├── user.py              # User model
│   │   └── item.py              # Item model
│   ├── schemas/
│   │   ├── user.py              # User Pydantic schemas
│   │   └── item.py              # Item Pydantic schemas
│   ├── services/
│   │   └── user_service.py      # Business logic
│   ├── utils/
│   │   └── helpers.py           # Utility functions
│   ├── tests/
│   │   ├── conftest.py          # Test fixtures
│   │   └── test_api.py          # API tests
│   └── main.py                  # FastAPI app entry point
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── requirements.txt             # Dependencies
└── README.md                    # Documentation
```
