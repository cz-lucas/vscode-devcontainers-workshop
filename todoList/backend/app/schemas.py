from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TodoBase(BaseModel):
    title: str
    completed: bool = False
    due_until: Optional[datetime] = None

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None
    due_until: Optional[datetime] = None

class Todo(TodoBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    due_until: Optional[datetime] = None

    class Config:
        orm_mode = True