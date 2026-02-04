from fastapi import APIRouter, HTTPException, Depends
from app.database import db
from app.models.message_model import MessageCreate, MessageResponse
from app.routes.auth_routes import get_current_user
from datetime import datetime
from bson import ObjectId

router = APIRouter()

# 1. Send a Message
@router.post("/", response_model=MessageResponse)
async def send_message(message: MessageCreate, current_user: dict = Depends(get_current_user)):
    
    new_message = {
        "sender_id": current_user["email"],
        "receiver_id": message.receiver_id,
        "content": message.content,
        "timestamp": datetime.utcnow()
    }

    result = await db.client.campus_connect_db.messages.insert_one(new_message)

    return {
        "id": str(result.inserted_id),
        **new_message
    }

@router.get("/conversations", response_model=list[str])
async def get_active_conversations(current_user: dict = Depends(get_current_user)):
    user_email = current_user["email"]
    
    # Find all messages where I am sender OR receiver
    messages = await db.client.campus_connect_db.messages.find({
        "$or": [
            {"sender_id": user_email},
            {"receiver_id": user_email}
        ]
    }).to_list(1000)

    # Extract unique people I've talked to
    conversation_partners = set()
    for msg in messages:
        if msg["sender_id"] == user_email:
            conversation_partners.add(msg["receiver_id"]) # I talked to them
        else:
            conversation_partners.add(msg["sender_id"])   # They talked to me

    return list(conversation_partners)

# 2. Get Chat History (Between Me and User X)
@router.get("/{other_user_email}", response_model=list[MessageResponse])
async def get_chat_history(other_user_email: str, current_user: dict = Depends(get_current_user)):
    
    # Logic: Find messages where (Sender=Me AND Receiver=Them) OR (Sender=Them AND Receiver=Me)
    query = {
        "$or": [
            {"sender_id": current_user["email"], "receiver_id": other_user_email},
            {"sender_id": other_user_email, "receiver_id": current_user["email"]}
        ]
    }

    # Sort by time (oldest first)
    messages = await db.client.campus_connect_db.messages.find(query).sort("timestamp", 1).to_list(1000)

    # Convert ObjectIds
    for msg in messages:
        msg["id"] = str(msg["_id"])
    
    return messages

# 3. ADMIN: Get All Messages (For Security/Monitoring)
@router.get("/admin/all", response_model=list[MessageResponse])
async def get_all_messages_admin(current_user: dict = Depends(get_current_user)):
    
    # Security Check
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    messages = await db.client.campus_connect_db.messages.find().sort("timestamp", -1).to_list(1000)
    
    for msg in messages:
        msg["id"] = str(msg["_id"])
        
    return messages