import React, { useEffect, useState } from "react";
import "./App.css";
import { Api } from "./services/api";

interface FormData {
  gymId?: any;
  photoLink?: any;
  id?: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  valueMonth?: number;
  description?: string;
  phoneWpp?: string;
  instagram?: string;
  cupomActive?: boolean;
  logo?: string;
  website?: string;
  anualStart?: string;
  details1?: string;
  details2?: string;
  details3?: string;
  details4?: string;
  images?: any[];
  shifts?: any[];
}

interface GymData {
  id: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  valueMonth?: number;
  description?: string;
  phoneWpp?: string;
  instagram?: string;
  cupomActive?: boolean;
  logo?: string;
  website?: string;
  anualStart?: string;
  details1?: string;
  details2?: string;
  details3?: string;
  details4?: string;
  images?: any[];
  shifts?: any[];
}

interface ProfessionalData {
  id: string;
  name: string;
  phoneWpp?: string;
  photoLink?: string;
  gymId?: string;
  Gyms: any;
}

const App = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
    valueMonth: 0,
    description: "",
    phoneWpp: "",
    instagram: "",
    cupomActive: false,
    logo: "",
    website: "",
    anualStart: "",
    details1: "",
    details2: "",
    details3: "",
    details4: "",
    images: [],
    shifts: [
      {
        day: "Segunda-feira",
        shift: "08:00 - 18:00",
      },
      {
        day: "Terça-feira",
        shift: "08:00 - 18:00",
      },
      {
        day: "Quarta-feira",
        shift: "08:00 - 18:00",
      },
      {
        day: "Quinta-feira",
        shift: "08:00 - 18:00",
      },
      {
        day: "Sexta-feira",
        shift: "08:00 - 18:00",
      },
      {
        day: "Sábado",
        shift: "08:00 - 18:00",
      },
      {
        day: "Domingo",
        shift: "08:00 - 18:00",
      },
    ],
  });

  const [gyms, setGyms] = useState<GymData[]>([]);
  const [professionals, setProfessionals] = useState<ProfessionalData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGyms();
    fetchProfessionals();
  }, []);

  const fetchGyms = async () => {
    try {
      setLoading(true);
      const { data } = await Api.get("gym");
      setGyms(data || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchProfessionals = async () => {
    setLoading(true);
    try {
      const { data } = await Api.get("gym/profesional");
      setProfessionals(data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEdit = (gym: GymData) => {
    const gymEdit = gym;

    if (gym?.shifts?.length === 0) {
      gymEdit.shifts = [
        {
          day: "Segunda-feira",
          shift: "08:00 - 18:00",
        },
        {
          day: "Terça-feira",
          shift: "08:00 - 18:00",
        },
        {
          day: "Quarta-feira",
          shift: "08:00 - 18:00",
        },
        {
          day: "Quinta-feira",
          shift: "08:00 - 18:00",
        },
        {
          day: "Sexta-feira",
          shift: "08:00 - 18:00",
        },
        {
          day: "Sábado",
          shift: "08:00 - 18:00",
        },
        {
          day: "Domingo",
          shift: "08:00 - 18:00",
        },
      ];
    }

    setFormData(gymEdit);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await Api.post(`gym/delete`, { id });
      fetchGyms();
      setLoading(false);
      alert("Academia excluída com sucesso!");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      // scroll to top
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        latitude: Number(String(formData.latitude)),
        longitude: Number(String(formData.longitude)),
        valueMonth: Number(String(formData.valueMonth)),
      };

      if (formData.id) {
        payload.id = formData.id;
        await Api.patch(`gym/update`, payload);
        alert("Academia atualizada com sucesso!");
      } else {
        await Api.post("gym/create", payload);
        alert("Academia criada com sucesso!");
      }

      fetchGyms();
      resetForm();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      latitude: 0,
      longitude: 0,
      valueMonth: 0,
      description: "",
      phoneWpp: "",
      instagram: "",
      cupomActive: false,
      logo: "",
      website: "",
      anualStart: "",
      details1: "",
      details2: "",
      details3: "",
      details4: "",
      photoLink: "",
      gymId: "",
      images: [],
      shifts: [
        {
          day: "Segunda-feira",
          shift: "08:00 - 18:00",
        },
        {
          day: "Terça-feira",
          shift: "08:00 - 18:00",
        },
        {
          day: "Quarta-feira",
          shift: "08:00 - 18:00",
        },
        {
          day: "Quinta-feira",
          shift: "08:00 - 18:00",
        },
        {
          day: "Sexta-feira",
          shift: "08:00 - 18:00",
        },
        {
          day: "Sábado",
          shift: "08:00 - 18:00",
        },
        {
          day: "Domingo",
          shift: "08:00 - 18:00",
        },
      ],
    });
    setLoading(false);
  };

  const handleProfessionalSubmit = async (e: React.FormEvent, edit = false) => {
    setLoading(true);
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        phoneWpp: formData.phoneWpp,
        photoLink: formData.photoLink,
        gymId: formData.gymId,
      };

      let urlApi = "";
      if (edit === false) {
        urlApi = "gym/profesional/create";
      } else {
        urlApi = "gym/profesional/update";
      }

      await Api.post(urlApi, payload);

      alert(
        `${
          edit === false
            ? "Profissional criado com sucesso!"
            : "Profissional atualizado com sucesso!"
        }`
      );

      fetchProfessionals();
      resetForm();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeleteProfessional = async (id: string) => {
    setLoading(true);

    try {
      await Api.post("gym/profesional/delete", { id });
      fetchProfessionals();
      alert("Profissional excluído com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAddImage = async (e: any) => {
    e.preventDefault();
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      images: [...prevFormData?.images, ""],
    }));
  };

  const handleRemoveImage = async (e: any, index: number) => {
    e.preventDefault();
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      images: prevFormData.images.filter((_: any, i: any) => i !== index),
    }));
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      images: prevFormData.images.map((image: any, i: number) => {
        if (i === index) {
          return e.target.value;
        }
        return image;
      }),
    }));
  };

  const handleShiftChange = (index: any, event: any) => {
    event.preventDefault();
    // @ts-ignore
    const values = [...formData?.shifts];
    values[index][event.target.name] = event.target.value;
    setFormData((prevState) => ({ ...prevState, shifts: values }));
  };

  const handleRemoveShift = (index: any) => {
    const values = [...formData?.shifts];
    values.splice(index, 1);
    setFormData((prevState) => ({ ...prevState, shifts: values }));
  };

  return (
    <div className={`container ${loading ? "active" : ""}`}>
      {loading && (
        <>
          <div className="loading-blur-global-centralize">
            <div className="loading"></div>
          </div>
        </>
      )}
      <h1> Nova Academia</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          Nome:
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Endereço:
          <input
            className="form-input"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Latitude:
          <input
            className="form-input"
            type="number"
            name="latitude"
            value={formData.latitude || ""}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Longitude:
          <input
            className="form-input"
            type="number"
            name="longitude"
            value={formData.longitude || ""}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Valor Mensal:
          <input
            className="form-input"
            type="number"
            name="valueMonth"
            value={formData.valueMonth || ""}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Descrição:
          <input
            className="form-input"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        {formData?.shifts?.map((shift, index) => (
          <div key={index} className="shift-row">
            <div className="form-row">
              <label className="form-label">
                Dia da semana:
                <input
                  className="form-input"
                  type="text"
                  name="day"
                  value={shift.day}
                  onChange={(event) => handleShiftChange(index, event)}
                />
              </label>
              <label className="form-label">
                Início e fim ex: (18:00 - 20:00):
                <input
                  className="form-input"
                  type="text"
                  name="shift"
                  value={shift.shift}
                  onChange={(event) => handleShiftChange(index, event)}
                />
              </label>
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveShift(index)}
                className="remove-shift-button"
              >
                Remover Turno
              </button>
            )}
          </div>
        ))}
        <label className="form-label">
          WhatsApp:
          <input
            className="form-input"
            type="text"
            name="phoneWpp"
            value={formData.phoneWpp}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Instagram:
          <input
            className="form-input"
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Cupom Ativo:
          <input
            className="form-checkbox"
            type="checkbox"
            name="cupomActive"
            checked={formData.cupomActive || false}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Logo:
          <input
            className="form-input"
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
          />
          {formData?.logo && (
            <div>
              <img
                style={{
                  width: "50px",
                  height: "50px",

                  borderRadius: "10px",
                }}
                src={formData?.logo}
              />
            </div>
          )}
        </label>
        <label className="form-label">
          Link da foto em detalhes da academia:
          <input
            className="form-input"
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
          {formData?.website && (
            <div>
              <img
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "200px",

                  borderRadius: "10px",
                }}
                src={formData?.website}
              />
            </div>
          )}
        </label>
        <label className="form-label">
          Início Anual:
          <input
            className="form-input"
            type="text"
            name="anualStart"
            value={formData.anualStart}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Detalhes 1:
          <input
            className="form-input"
            type="text"
            name="details1"
            value={formData.details1}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Detalhes 2:
          <input
            className="form-input"
            type="text"
            name="details2"
            value={formData.details2}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Detalhes 3:
          <input
            className="form-input"
            type="text"
            name="details3"
            value={formData.details3}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Detalhes 4:
          <input
            className="form-input"
            type="text"
            name="details4"
            value={formData.details4}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Imagens:
          {/* array of images */}
          <div>
            <button onClick={handleAddImage}>Adicionar Imagem</button>
            {formData?.images?.map((image, index) => (
              <>
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input
                    className="form-input"
                    type="text"
                    name="images"
                    style={{
                      marginTop: "10px",
                    }}
                    value={image}
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <button onClick={(e) => handleRemoveImage(e, index)}>
                    X
                  </button>
                </div>
              </>
            ))}

            {/* PREVIEW IMAGES CARROUSEL*/}

            {formData?.images?.map((image, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  marginBottom: "10px",
                }}
              >
                <img
                  style={{
                    maxWidth: "400px",
                    height: "200px",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                  src={image}
                />
              </div>
            ))}
          </div>
        </label>
        <button className="form-button" type="submit">
          {formData.id ? "Editar Academia" : "Criar Academia"}
        </button>
      </form>
      <div className="gyms-list">
        <h2>Academias Cadastradas</h2>
        {gyms.map((gym) => (
          <div key={gym.id} className="gym-item">
            <span className="gym-name">{gym.name}</span>
            <button className="edit-button" onClick={() => handleEdit(gym)}>
              Editar
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(gym.id)}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>

      <h2>Criar Novo Profissional</h2>
      <form className="form" onSubmit={handleProfessionalSubmit}>
        <label className="form-label">
          Nome:
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="form-label">
          WhatsApp:
          <input
            className="form-input"
            type="text"
            name="phoneWpp"
            value={formData.phoneWpp}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="form-label">
          Link da Foto:
          <input
            className="form-input"
            type="text"
            name="photoLink"
            value={formData.photoLink}
            onChange={handleChange}
          />
          {formData?.photoLink && (
            <div>
              <img
                style={{
                  width: "90px",
                  height: "90px",

                  borderRadius: "10px",
                }}
                src={formData?.photoLink}
              />
            </div>
          )}
        </label>
        <br />
        <label className="form-label">
          Academia:
          <select
            className="form-select"
            name="gymId"
            value={formData?.gymId}
            onChange={handleChange}
          >
            <option value="">Selecione a academia</option>
            {gyms?.length > 0 &&
              gyms?.map((gym) => (
                <option key={gym.id} value={gym.id}>
                  {gym?.name}
                </option>
              ))}
          </select>
        </label>
        <br />
        <button className="form-button" type="submit">
          Criar Profissional
        </button>
      </form>

      <div className="gyms-list">
        <h2>Profissionais Cadastrados</h2>
        {professionals.map((professional) => (
          <div key={professional.id} className="gym-item">
            <span className="gym-name">{professional.name}</span>
            <span className="gym-name">
              {professional?.Gyms.length > 0 &&
                professional?.Gyms?.map((item: any) => {
                  return item?.gym?.name;
                })}
            </span>

            <div className="professional-buttons">
              <button
                className="delete-button"
                onClick={() => handleDeleteProfessional(professional.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
