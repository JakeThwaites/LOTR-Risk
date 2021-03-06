import React, { Component } from "react";
import FormButton from "../common/FormButton";
import ChatInput from "./ChatInput";
import io from "socket.io-client";
import ChatWindow from "./ChatWindow";
import { ChatMessage } from './ChatMessageType';


const socket = io("http://localhost:4000");

type Props = {
  playerName: string
}

type State = {
  chatInput: string,
  messages: Array<ChatMessage>,
  isSomeoneTyping: boolean
}

class Chat extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      chatInput: "",
      messages: [],
      isSomeoneTyping: false
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.listenForMessages();
  }

  componentWillUnmount() {
    socket.removeAllListeners();
  }
  
  handleKeyDown(event: any) {
    switch (event.key) {
      case "Enter":
        this.onSubmitMessage();
        break;
      default:
        break;
    }
  }
  
  listenForMessages() {
    socket.on("chat", (message: ChatMessage) => {
      this.addMessageToList(message);
    });
  }

  addMessageToList(message: ChatMessage) {
    const { messages } = this.state;
    messages.push(message);
    this.setState({ messages });
  }

  onSubmitMessage() {
    const { chatInput } = this.state;

    if (chatInput.length < 1) {
      return;
    }

    this.emitChatMessage();
  }

  emitChatMessage() {
    const { chatInput } = this.state;
    const { playerName } = this.props;
    const message = { chatHandle: playerName, chatInput };
    socket.emit("chat", message);
    this.setState({ chatInput: "", isSomeoneTyping: false });
  }

  onTextChange(event: any) {
    const text = event.target.value;
    this.setState({ chatInput: text });

    if (text.length > 0) {
      this.setState({ isSomeoneTyping: true });
    } else {
      this.setState({ isSomeoneTyping: false });
    }
  }

  render() {
    const { chatInput, messages, isSomeoneTyping } = this.state;
    return (
      <div id="chat">
        <h2 id="chat--header">Chat</h2>
        <ChatWindow messages={messages} isSomeoneTyping={isSomeoneTyping} />
        <ChatInput
          message={chatInput}
          onTextChange={this.onTextChange}
          onKeyPress={this.handleKeyDown}
        />
        <FormButton
          id="chat--send-button"
          label="send"
          onClick={this.onSubmitMessage}
          disabled={false}
        />
      </div>
    );
  }
}

export default Chat;
