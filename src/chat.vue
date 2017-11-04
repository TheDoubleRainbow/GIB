Vue.component('chat', {
	template: `
		<div>
			<div class="chat-open" @click="openChat()">Open chat</div>
			<div class="chat-body" :id="chatid">
				<a @click="closeChat" class="delete chat-close"></a>
				<div class="chat-display">
					<div :class="getMessageType(message)" v-for="message in messages">{{message.user + ': ' + message.text}}</div>
				</div>
		        <div class="chat-input">
		          <input type="text" name="input" class="input" id="0">
		        </div>
		    </div>
        </div>
	`,
	props: ['chatid'],
	data: function() {
		return {
			messages: [{user: "Vasya", text: "Hello world"}, {user: "Kolya", text: "sdasdsada"}, {user: "me", text: "Hello it's me Mario"}]
		}
	},
	methods:{
		getMessageType(message){
			return message.user == "me" ? "chat-message chat-message-byuser" : "chat-message"
		},
		openChat(){
			document.getElementById(this.chatid).style.display = "block"; document.getElementById(this.chatid).style.left = window.innerWidth/2+'';

		},
		closeChat(){
			document.getElementById(this.chatid).style.display = "none";
		}
	}
})