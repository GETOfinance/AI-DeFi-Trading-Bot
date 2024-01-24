import React, { useEffect } from "react";
import { useRouter } from "next/router";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";
import sendTelegramMessage from "../actions/welcome";

export default function Home() {
  const router = useRouter();
  const { id, first_name, last_name, username, photo_url, auth_date, hash } =
    router.query;

  const isLoggedIn = Boolean(id);

  useEffect(() => {
    if (isLoggedIn && id) {
      const welcomeMessage = "Hello This is your web3 Agent!";
      sendTelegramMessage(id, welcomeMessage)
        .then((response) => console.log("Message sent:", response))
        .catch((error) => console.error("Error:", error));
    }
  }, [id]);

  const UserCard = () => (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
        marginTop: "20px",
      }}
    >
      <h3>User Information</h3>
      {id && (
        <p>
          <strong>ID:</strong> {id}
        </p>
      )}
      {first_name && (
        <p>
          <strong>First Name:</strong> {first_name}
        </p>
      )}
      {last_name && (
        <p>
          <strong>Last Name:</strong> {last_name}
        </p>
      )}
      {username && (
        <p>
          <strong>Username:</strong> {username}
        </p>
      )}
      {photo_url && (
        <div>
          <strong>Photo:</strong>{" "}
          <img
            src={decodeURIComponent(photo_url)}
            alt="User Photo"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        </div>
      )}
      {auth_date && (
        <p>
          <strong>Auth Date:</strong>{" "}
          {new Date(Number(auth_date) * 1000).toLocaleString()}
        </p>
      )}
      {hash && (
        <p>
          <strong>Hash:</strong> {hash}
        </p>
      )}
    </div>
  );

  return (
    <main className="h-screen flex flex-row justify-center items-center">
      {!isLoggedIn && (
        <TelegramLoginButton
          botName="EntropyTesting_Bot"
          dataOnauth={(user) => console.log(user)}
          dataAuthUrl="https://trading-bott.netlify.app/"
        />
      )}
      {isLoggedIn && <UserCard />}
    </main>
  );
}
