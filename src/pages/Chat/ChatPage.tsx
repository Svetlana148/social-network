import React, { useEffect } from 'react';

//   ChatPage(Chat(Messages, ChatMessageAddForm))


//Создаем канал "WebSocket" для ВСЕГО приложения
const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')


//Эта к-та взаимодействует с API, Redux, Store ... (т.е. она как контейнерная)
const ChatPage: React.FC = () => {
	return <div>
		<Chat />
	</div>
}


const Chat: React.FC = () => {

	//Синхронизируемся с "WebSocket"-ом при 1-ом инициализационном "render"-е
	//Вешаем обработчик событий на "WebSocket"
	useEffect(() => { 
							ws.addEventListener('message', (e) => { 
							console.log(e)})
						}, []	)


	return <div>
		<Messages />
		<ChatMessageAddForm />
	</div>
}



//----------------------------------------------------------------
const Messages: React.FC = () => {
	const message = [1, 2, 3, 4];
	return <div style={{ height: '400px', overflowY: 'auto' }}>
		{message.map((m: any) => < Message />)}
		{message.map((m: any) => < Message />)}
		{message.map((m: any) => < Message />)}


		Messages
	</div>
}




const Message: React.FC = () => {
	const message = {
		url: '	https://via.placeholder.com/30',
		auther: "Dima",
		text: "Hallo everyone"
	}
	return <div>

		<img src={message.url} alt=''/><b>{message.auther}</b>
		<br />{message.text}
		<hr />
	</div>

}
//-------------------------------------------------------------------

const ChatMessageAddForm: React.FC = () => {
	return <div>
		<textarea ></textarea>
		<button>Send</button>
	</div>
}



export default ChatPage;