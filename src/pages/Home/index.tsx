import React, { useEffect, useState } from "react";
import "../../App.css";
import { Api } from "../../services/api";
import FaceSimilarityComponent from "../../Components/FaceSimilarityComponent";
import { Personal, PersonalData } from "../../Components/Personal";
import { Actuation } from "../../Components/Actuation";
import { GeneralSettings } from "../../Components/GeneralSettings";
import { Professional } from "../../Components/Professional";
import { NotificationComponent } from "../../Components/Notifications";

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
  listPrices?: any[];
  actuationName?: string;
  actuationDescription?: string;
  occupation?: string;
  experience?: string;
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
  listPrices?: any[];
  actuationName?: string;
  actuationDescription?: string;
}

const Home = () => {
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
    listPrices: [],
    actuationName: "",
    actuationDescription: "",
    occupation: "",
    experience: "",
  });
  const [personals, setPersonals] = useState<PersonalData[]>([]);
  const [gyms, setGyms] = useState<GymData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGyms();
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
        listPrices:
          formData?.listPrices && formData?.listPrices?.length > 0
            ? formData?.listPrices?.map((item: any) => ({
                name: item.name,
                price: Number(String(item.price)),
              }))
            : [],
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

  const resetForm = (fields = []) => {
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
      listPrices: [],
      actuationName: "",
      actuationDescription: "",
    });
    if (fields.length > 0) {
      fields.forEach((field) => {
        setFormData((prevFormData) => {
          return {
            ...prevFormData,
            [field]: "",
          };
        });
      });
    }

    setLoading(false);
    location?.reload();
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

  const handleAddPrices = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      listPrices: [...prevFormData?.listPrices, { name: "", price: 0 }],
    }));
  };

  const handleRemovePrices = (e: any, index: number) => {
    e.preventDefault();
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      listPrices: prevFormData.listPrices.filter(
        (_: any, i: any) => i !== index
      ),
    }));
  };

  const handlePricesChange = (index: any, event: any) => {
    event.preventDefault();
    // @ts-ignore
    const values = [...formData?.listPrices];
    values[index][event.target.name] = event.target.value;
    setFormData((prevState) => ({ ...prevState, listPrices: values }));
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
        <label className="form-label">
          <button
            type="button"
            onClick={(e: any) => handleAddPrices(e)}
            className="button-add"
          >
            Adicionar Plano
          </button>
        </label>

        {formData?.listPrices?.map((price, index) => (
          <div key={index} className="price-row">
            <div className="form-row">
              <label className="form-label">
                Nome do plano:
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  value={price.name}
                  onChange={(event) => handlePricesChange(index, event)}
                />
              </label>
              <label className="form-label">
                Valor:
                <input
                  className="form-input"
                  type="number"
                  name="price"
                  value={price.price}
                  onChange={(event) => handlePricesChange(index, event)}
                />
              </label>
            </div>

            <button
              style={{
                marginBottom: 10,
              }}
              type="button"
              onClick={(e) => handleRemovePrices(e, index)}
              className="button-remove"
            >
              Remover Plano
            </button>
          </div>
        ))}

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
          <br />
          ex: ( jeovagomes )
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

      <Professional
        formData={formData}
        gyms={gyms}
        handleChange={handleChange}
        resetForm={resetForm}
        setLoading={setLoading}
      />

      <Personal
        setPersonals={setPersonals}
        personals={personals}
        formData={formData}
        handleChange={handleChange}
        resetForm={resetForm}
        setLoading={setLoading}
      />

      <Actuation
        formData={formData}
        personals={personals}
        setPersonals={setPersonals}
        handleChange={handleChange}
        resetForm={resetForm}
        setLoading={setLoading}
      />
      <GeneralSettings
        formData={formData}
        handleChange={handleChange}
        resetForm={resetForm}
        setLoading={setLoading}
      />

      <NotificationComponent setLoading={setLoading} />

      {/* <ImageAiArt /> */}

      <FaceSimilarityComponent />
    </div>
  );
};

export default Home;
