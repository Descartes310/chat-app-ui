import Chat from "./Chat";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  date: {
    fontWeight: 500,
    color: "rgba(0,0,0,0.4)",
    margin: "12px 0",
    fontSize: 12,
    textAlign: "center"
  }
}));

const chatUser = {
  id: "3",
  name: "Jagadeesh Palaniappan",
  lastText: "You sent a photo • 1:05 PM",
  imgUrl:
    "https://avatars2.githubusercontent.com/u/2826368?s=460&u=fa549158be45516110cbf9f0306eb28e5fd42e9e&v=4",
  status: { read: true, responded: true, online: true }
};

const ChatConversation = () => {
  const styles = useStyles();
  return (
    <Box p={"16px 30px 12px 10px"}>
      <Chat
        avatar={chatUser.imgUrl}
        messages={[
          "Hi Sundar, How r u?",
          "Are you working from home today?",
          "I have a question regarding your project"
        ]}
      />
      <Typography className={styles.date}>FRI 1:46 PM</Typography>
      <Chat
        side={"right"}
        messages={[
          "Hello Jagadeesh! I'm doing great",
          {
            type: "image",
            alt: "sticker",
            src:
              "https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.1997-6/47165057_2150118098374296_5034322199196991488_n.png?_nc_cat=1&_nc_eui2=AeGsL8WciYpwOySYRQINElIdV9NubJ7ZbWTW9J5-DlXHPiLCKR8Zvvd4nVyPH4Wa8kceFiL10mXvokNFcEJx9JWz-6XLYgCLmOgTniFDbSjUPw&_nc_ohc=pewFeK6M1ZIAQkL5L9QR2FZcwYjZ0FTWid2zHeUqboLU4azOITkLVGaog&_nc_ht=scontent.fbkk12-3.fna&oh=27a2a48aabccd4cdae4ec4f3f775daa9&oe=5EAF0F3B"
          },
          "Yes, I'm WFH",
          "Sure! I'm happy to help"
        ]}
      />
      <Typography className={styles.date}>FRI 4:18 PM</Typography>
      <Chat
        avatar={chatUser.imgUrl}
        messages={["Shall we have quick meeting?"]}
      />
      <Chat
        side={"right"}
        avatar={chatUser.imgUrl}
        messages={["Sure!", "I will join in 10mins"]}
      />
      <Chat
        avatar={chatUser.imgUrl}
        messages={[
          "Ok, Great!"
        ]}
      />
      <Typography className={styles.date}>FRI 1:46 PM</Typography>
    </Box>
  );
};

export default ChatConversation;