import { useState } from "react";
import "./Submit.css";
export default function Submit() {
  const [form, setForm] = useState({});

  const handleClick = (e) => {
      alert(form.title)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <center>
      <table className="main">
        <tbody>
          <tr>
            <td className="headerSubmit">
              <table>
                <tbody>
                  <tr>
                    <td className="headerTitle">
                      <span>
                        <b>Submit</b>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr className="formulario">
            <td className="formulario">
              <form className="formulario">
                <table>
                  <tbody>
                    <tr className="title">
                      <td className="titleRow">
                        <label htmlFor="title">title </label>
                        <input
                          className="inputTitle"
                          type="text"
                          id="title"
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr className="url">
                      <td className="urlRow">
                        <label htmlFor="url">url </label>
                        <input
                          className="inputRow"
                          type="text"
                          id="url"
                          name="url"
                          value={form.url}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                        <td>
                        <span className="separatOR">
                        <b>or</b>
                      </span>
                        </td>
                     
                    </tr>
                    <tr className="bodyRow">
                      <td>
                        <label className="body" htmlFor="body">
                          text{" "}
                        </label>
                      </td>
                      <td>
                        {" "}
                        <textarea
                          rows="4"
                          cols="49"
                          id="body"
                          name="body"
                          value={form.body}
                          onChange={handleChange}
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="submitlabel" type="submit" onClick={handleClick}></input>
                      </td>
                    </tr>
                    <tr style={{ height: "20px" }}></tr>
                    <tr>
                      <td className="footerText">
                        <span>
                          Leave url blank to submit a question for discussion.
                          If there is no url, the text (if any) will appear at
                          the top of the thread.
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  );
}
