import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Grow,
  InputBase,
  Typography,
} from '@material-ui/core';
import makeStyles from "@material-ui/core/styles/makeStyles";

import { getMessages, sendMessage } from "libs/ServerClient";

const useStyles = makeStyles(theme => ({
  chatContainer: {
    backgroundColor: "#666",
    borderRadius: 5,
  },
  messagesContainer: {
    flex: '1 1 0%',
    overflowY: 'scroll',
    height: 300,
    WebkitOverflowScrolling: 'touch',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      maxWidth: '100%',
    },
  },
  inputField: {
    width: "100%",
    borderRadius: "0 0 5px 5px",
    height: 40,
    backgroundColor: "white",
  }
}));

const Message = ({
  message,
}: {
  message: { id: string; text: string; writer: string; };
}): React.ReactElement => {
  const isSelf = (message: { writer: string }) => {
    const selfId = "42d5a38e-fd54-4ee5-8944-86e7f74e8893";
    return message.writer === selfId;
  };

  const l = isSelf(message) ? '20%' : 1;
  const r = isSelf(message) ? 1 : '20%';
  const bgcolor = isSelf(message) ? 'primary.main' : 'background.paper';
  const color = isSelf(message) ? 'primary.contrastText' : 'text.primary';
  const justifyContent = isSelf(message) ? 'flex-end' : 'flex-start';

  return (
    <Grow in>
      <Box
        id={message.id}
        flex="0 0 auto"
        my={1}
        pl={l}
        pr={r}
        display="flex"
        justifyContent={justifyContent}
      >
        <Box
          minWidth={0}
          py={1}
          px={2}
          bgcolor={bgcolor}
          color={color}
          borderRadius={8}
          boxShadow={2}
        >
          <Typography
            variant="body1"
            style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}
          >
            {message.text}
          </Typography>
        </Box>
      </Box>
    </Grow>
  );
}

export default function Chat({ roomId }: { roomId: string; }) {
  const classes = useStyles();
  const messagesRef = useRef<HTMLDivElement>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState(getMessages(roomId));

  const scrollBottom = (ref: React.RefObject<HTMLDivElement>, behavior = "smooth" as "smooth" | "auto" | undefined) => {
    if (ref && ref.current)
      ref.current.scroll({ top: ref.current.scrollHeight, behavior });
  }

  useEffect(() => {
    scrollBottom(messagesRef, "auto");
  }, [messagesRef]);

  const onSendClick = () => {
    setMessages([...messages, sendMessage(roomId, inputMessage)]);
    setInputMessage("");
  }

  useEffect(() => {
    setTimeout(() => {
      scrollBottom(messagesRef);
    }, 200);
  }, [messages]);

  return <div className={classes.chatContainer}>
    <div className={classes.messagesContainer} ref={messagesRef}>
      {messages.map(
        (message, index): React.ReactElement =>
          <Message
            key={index}
            message={message}
          />)}
    </div>
    <div className={classes.inputField}>
      <InputBase
        placeholder="メッセージを入力してください"
        value={inputMessage}
        onChange={(event) => setInputMessage(event.target.value)}
        style={{ marginLeft: "5%", width: "80%", height: 40 }}
      />
      <button onClick={onSendClick} style={{ width: "15%" }} disabled={!inputMessage}>送信</button>
    </div>
  </div>
};
