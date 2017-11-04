Vue.component('chat', {
	template: `
		<div>
			<div class="chat-open" @click="openChat()">Open chat</div>
			<div class="chat-body animated zoomInUp" :id="chatid">
				<a @click="closeChat" class="delete chat-close"></a>
				<div class="chat-display">
					<div :class="getMessageType(message)" v-for="message in messages">{{message.user + ': ' + message.text}}</div>
				</div>
		        <div class="chat-input">
		          <input @keyup.enter="sendMessage" v-model="input" type="text" placeholder="Enter your message" name="input" class="input">
		        </div>
		    </div>
        </div>
	`,
	props: ['chatid'],
	data: function() {
		return {
			input: "",
			messages: [{user: "Vasya", text: "Hello world"}, {user: "Kolya", text: "sdasdsada"}, {user: "Me", text: "Hello it's me Mario"}, {user: "Rotschild", text: "Gutten Tag"}]
		}
	},
	methods:{
		getMessageType(message){
			return message.user == "Me" ? "chat-message chat-message-byuser" : "chat-message"
		},
		openChat(){
			document.getElementById(this.chatid).className = "chat-body animated zoomInUp"; document.getElementById(this.chatid).style.display = "block"; document.getElementById(this.chatid).style.left = window.innerWidth/2+'';

		},
		closeChat(){
			document.getElementById(this.chatid).className = "chat-body animated zoomOut"
			//document.getElementById(this.chatid).style.display = "none";
		},
		sendMessage(){
			this.messages.push({user: "Me", text: this.input})
			this.input = ""
		}
	}
})