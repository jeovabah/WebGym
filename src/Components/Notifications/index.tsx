import { Api } from "../../services/api";
import { useState } from "react";

interface Props {
  setLoading: (value: boolean) => void;
}

export const NotificationComponent = ({ setLoading }: Props) => {
  const [inputNotification, setInputNotification] = useState<any>({
    title: "",
    body: "",
  });

  const handleSendNotification = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await Api.post("notification/sendNotificationAll", {
        title: inputNotification.title,
        body: inputNotification.body,
      });
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <h2
        style={{
          marginTop: 20,
        }}
      >
        Enviar notificação para todos os dispositivos
      </h2>
      <form className="form" onSubmit={handleSendNotification}>
        <label className="form-label">
          Titulo da mensagem
          <input
            className="form-input"
            type="text"
            name="contactWppGym"
            value={inputNotification.title}
            onChange={(e) =>
              setInputNotification({
                ...inputNotification,
                title: e.target.value,
              })
            }
          />
        </label>
        <br />
        <label className="form-label">
          Descricao da mensagem
          <input
            className="form-input"
            type="text"
            name="contactWppTrainner"
            value={inputNotification.notification}
            onChange={(e) => {
              setInputNotification({
                ...inputNotification,
                body: e.target.value,
              });
            }}
          />
        </label>
        <br />
        <button className="form-button" type="submit">
          Enviar notificação
        </button>
      </form>
    </>
  );
};
