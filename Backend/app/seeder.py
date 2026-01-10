import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

# Local MongoDB connection 
MONGODB_URL = "mongodb://localhost:27017" 

async def seed_data():
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client["2fast2hack_db"]
    
    # 1. Problem Statements Data [cite: 6, 67, 82]
    problems = [
        {
            "ps_id": "PS-01",
            "title": "AI for Agriculture",
            "domain": "Machine Learning",
            "short_description": "Build a tool to detect crop diseases.",
            "download_link": "https://example.com/ps1.pdf",
            "difficulty_level": "Intermediate"
        }
    ]
    
    # 2. FAQ Data 
    faqs = [
        {
            "question": "What is the team size?",
            "answer": "Teams should consist of 2-4 members."
        }, # Added missing closing brace here
        {
            "question": "Is the PPT template mandatory?",
            "answer": "Yes, please use the template provided in the resources section."
        }
    ]

    try:
        # Clear existing data to avoid duplicates 
        print("Cleaning old data...")
        await db["problem_statements"].delete_many({}) 
        await db["faqs"].delete_many({})

        # Insert Problem Statements [cite: 67, 82]
        if problems:
            await db["problem_statements"].insert_many(problems)
            print(f"Successfully seeded {len(problems)} problem statements!")

        # Insert FAQs 
        if faqs:
            await db["faqs"].insert_many(faqs)
            print(f"Successfully seeded {len(faqs)} FAQs!")

        print("-" * 30)
        print("✅ DATABASE SEEDING COMPLETE")
        
    except Exception as e:
        print(f"❌ Error during seeding: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_data())