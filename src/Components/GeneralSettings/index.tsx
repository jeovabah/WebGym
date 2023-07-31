import { Api } from "../../services/api";
import { useState, useEffect } from "react";

interface Props {
  setLoading: (value: boolean) => void;
  formData: any;
  handleChange: any;
  resetForm: (field: any) => void;
}

export const GeneralSettings = ({
  setLoading,
  formData,
  handleChange,
  resetForm,
}: Props) => {
  const [generalSettings, setGeneralSettings] = useState<any>({});

  const getGeneralSettings = async () => {
    setLoading(true);
    try {
      const { data } = await Api.get("generalSettings");
      setGeneralSettings(data?.generalSettings || {});
      formData.contactWppTrainner = data?.generalSettings?.contactWppTrainner;
      formData.contactWppGym = data?.generalSettings?.contactWppGym;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCreateGeneralSettings = async (
    e: React.FormEvent,
    edit = false
  ) => {
    setLoading(true);
    e.preventDefault();
    try {
      const payload = {
        id: generalSettings.id,
        contactWppGym: formData?.contactWppGym || null,
        contactWppTrainner: formData?.contactWppTrainner || null,
      };

      await Api.patch(`generalSettings/update`, payload);

      alert(
        `${
          edit === false
            ? "Config atualizado com sucesso!"
            : "Config atualizado com sucesso!"
        }`
      );

      resetForm(["price", "about", "contactWppGym", "contactWppTrainner"]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getGeneralSettings();
  }, []);

  return (
    <>
      <h2
        style={{
          marginTop: 20,
        }}
      >
        Atualizando texto para whatsapp
      </h2>
      <form className="form" onSubmit={(e) => handleCreateGeneralSettings(e)}>
        <label className="form-label">
          Texto para whatsapp em detalhes da academia:
          <input
            className="form-input"
            type="text"
            name="contactWppGym"
            value={formData.contactWppGym}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="form-label">
          Link do icone:
          <input
            className="form-input"
            type="text"
            name="contactWppTrainner"
            value={formData.contactWppTrainner}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className="form-button" type="submit">
          Atualizar Textos
        </button>
      </form>
    </>
  );
};
