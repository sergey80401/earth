from aiogram import types, Router
from aiogram.filters import CommandStart

router = Router()


@router.message(CommandStart())
async def cdm_start(message: types.Message):
    await message.answer('Here we go. Vvedite chisla:')


@router.message()
async def nums_sum(message: types.Message):
    nmbrs = message.text.split()
    result = 0
    for i in range(len(nmbrs)):
        result += int(nmbrs[i])
    await message.answer(f'Summa ravna: {result}')
