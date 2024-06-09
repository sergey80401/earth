import asyncio
import os

from aiogram import Bot, Dispatcher, Router
from aiogram.types import Message, KeyboardButton, WebAppInfo, InlineKeyboardButton
from aiogram.utils.keyboard import KeyboardBuilder, InlineKeyboardBuilder
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

bot = Bot(token=os.getenv('TOKEN'))
dp = Dispatcher()
router = Router()
dp.include_router(router)

kb = InlineKeyboardBuilder()

kb.row(InlineKeyboardButton(text="Run app", web_app=WebAppInfo(url="https://10.5.1.152:5173/")))


@router.message()
async def handle(message: Message):
    await message.answer("hello", reply_markup=kb.as_markup())


async def main():
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)


asyncio.run(main())
