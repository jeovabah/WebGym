import { Api } from "../../services/api";
import { useState, useEffect } from "react";

interface Props {
  setLoading: (value: boolean) => void;
  formData: any;
  handleChange: any;
  resetForm: (field: any) => void;
  personals: PersonalData[];
  setPersonals: (value: PersonalData[]) => void;
}

interface PersonalData {
  id: string;
  name: string;
  photoLink?: string;
  phoneWpp?: string;
  price?: number;
  description?: string;
  about?: string;
  actuation?: any;
  createdAt: Date;
  updatedAt: Date;
  instagram?: string;
}

export const Actuation = ({
  setLoading,
  formData,
  handleChange,
  resetForm,
  personals,
}: Props) => {
  const [actuations, setActuations] = useState<any>([]);

  const getActuations = async () => {
    setLoading(true);
    try {
      const { data } = await Api.get("trainners/all/actuations");
      setActuations(data?.actuations || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCreateActuation = async (e: React.FormEvent, edit = false) => {
    setLoading(true);
    e.preventDefault();
    try {
      const payload = {
        actuation: formData.actuation,
        icon: formData.icon,
      };

      await Api.post(`trainners/${formData?.personalId}/actuation`, payload);

      alert(
        `${
          edit === false
            ? "Atuacao criado com sucesso!"
            : "Atuacao atualizado com sucesso!"
        }`
      );

      resetForm(["price", "about", "icon"]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeleteActuation = async (actuationId: string, e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Api.delete(`trainners/${actuationId}/actuation`);
      alert("Atuacao excluído com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getActuations();
  }, []);

  return (
    <>
      <h2
        style={{
          marginTop: 20,
        }}
      >
        Criar Novo Atuacao
      </h2>
      <form className="form" onSubmit={(e) => handleCreateActuation(e)}>
        <label className="form-label">
          Especialidade:
          <input
            className="form-input"
            type="text"
            name="actuation"
            value={formData.actuation}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="form-label">
          Link do icone:
          <input
            className="form-input"
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
          />
        </label>
        {formData.icon && (
          <img
            src={formData.icon}
            style={{
              width: 50,
              height: 50,
              marginLeft: 10,
            }}
            alt="icon"
          />
        )}{" "}
        <br />
        <label className="form-label">
          Profissional:
          <select
            className="form-select"
            name="personalId"
            value={formData?.personalId}
            onChange={handleChange}
          >
            <option value="">Selecione o Profissional</option>
            {personals?.length > 0 &&
              personals?.map((personal: any) => (
                <option key={personal.id} value={personal.id}>
                  {personal?.name}
                </option>
              ))}
          </select>
        </label>
        <br />
        <button className="form-button" type="submit">
          Criar Atuacao
        </button>
      </form>

      <div className="gyms-list">
        <h2>Atuacoes Cadastrados</h2>
        {actuations.map((actuation: any) => (
          <div key={actuation?.id} className="gym-item">
            <span className="gym-name">
              {actuation?.actuation}
              {"    "}
              {actuation?.icon && (
                <img
                  src={actuation?.icon}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  alt="icon"
                />
              )}{" "}
            </span>
            <span className="gym-name">{actuation?.trainner?.name}</span>
            <div className="personal-buttons">
              <button
                className="delete-button"
                onClick={(e) => handleDeleteActuation(actuation.id, e)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
