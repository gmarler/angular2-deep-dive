export const HOVER_INPUT = `
  input:hover {
    background-color: #eee;
  }
`;

export const FORM_STYLING = `
  input {
    padding: 0;
    border: none;
    border-radius: 0;
    -webkit-appearance: none;
    -webkit-box-shadow: inset 0 -1px 0 #dddddd;
    box-shadow: inset 0 -1px 0 #dddddd;
    font-size: 16px;
    display: block;
    width: 100%;
    height: 37px;
    padding: 6px 16px;
    line-height: 1.846;
    color: #666666;
    background-color: transparent;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 3px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  input.form-control:focus {
    box-shadow: inset 0 -2px 0 #2196f3;
    border-color: #66afe9;
    outline: 0;
  }
`;
