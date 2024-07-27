import "./App.css";
import React, { useState, useRef } from "react";
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const inputRef = useRef(null);
    const [image, setImage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [gender, setGender] = useState("male");
    const [education, setEducation] = useState("");
    const [marks, setMarks] = useState({ maths: 0, physics: 0, chemistry: 0 });
    const [totalMarks, setTotalMarks] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [pincode, setPincode] = useState("");
    const [about, setAbout] = useState("");
    const [validated, setValidated] = useState(false);

    const locations = {
        India: {
            Maharashtra: ["Darwha", "Yavatmal"],
            Bihar: ["Katraj", "Tarnoli"],
        },
        USA: {
            Alaska: ["alkino", "newalaska"],
            SanFrancisco: ["santoss", "chamry"],
            NewJersey: ["Gnna", "Marai", "Lasia"],
        },
    };

    const handleSuccessClick = () => {
        Swal.fire('Success!', 'Your action has been completed', 'success');
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            console.log(
                firstName,
                lastName,
                email,
                contact,
                gender,
                selectedCountry,
                selectedState,
                selectedDistrict,
                pincode,
                marks,
                totalMarks,
                about
            );
            handleSuccessClick();
        }
        setValidated(true);
    };

    const handleMarksChange = (sub, value) => {
        const newMarks = { ...marks, [sub]: value };
        setMarks(newMarks);
        const newTotalMarks = Object.values(newMarks).reduce((a, b) => a + parseInt(b || 0), 0);
        setTotalMarks(newTotalMarks);
    };

    const handleReset = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setContact("");
        setGender("male");
        setMarks({ maths: 0, physics: 0, chemistry: 0 });
        setTotalMarks(0);
        setSelectedCountry("");
        setSelectedState("");
        setSelectedDistrict("");
        setPincode("");
        setAbout("");
        setEducation("");
        setImage("");
    };

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    return (
        <div className="App">
            <h1>Form in React</h1>
            <div className="main">
                <div className="form-container">
                    <div className="upload image" onClick={handleImageClick}>
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt="" />
                        ) : (
                            <img src="./uploadd.jpg" alt="" />
                        )}
                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                    </div>
                    <div className="form-fields">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="First name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">Please provide a first name.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">Please provide a last name.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationContact">
                                    <Form.Label>Contact</Form.Label>
                                    <Form.Control
                                        required
                                        type="tel"
                                        placeholder="Contact"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">Please provide a valid contact number.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationGender" className="gender-container">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Male"
                                        name="gender"
                                        id="genderMale"
                                        value="male"
                                        checked={gender === "male"}
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Female"
                                        name="gender"
                                        id="genderFemale"
                                        value="female"
                                        checked={gender === "female"}
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Other"
                                        name="gender"
                                        id="genderOther"
                                        value="other"
                                        checked={gender === "other"}
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">Please select a gender.</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationEducation">
                                    <Form.Label>Education</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={education}
                                        onChange={(e) => setEducation(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select Education Level</option>
                                        <option value="highschool">High School</option>
                                        <option value="undergraduate">Undergraduate</option>
                                        <option value="postgraduate">Postgraduate</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">Please select an education level.</Form.Control.Feedback>
                                </Form.Group>
                                {education && (
                                    <>
                                        <Form.Group as={Col} md="2" controlId="validationMathsMarks">
                                            <Form.Label>Math</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Math Marks"
                                                value={marks.maths}
                                                onChange={(e) => handleMarksChange("maths", e.target.value)}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">Please provide math marks.</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationPhysicsMarks">
                                            <Form.Label>Physics</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Physics Marks"
                                                value={marks.physics}
                                                onChange={(e) => handleMarksChange("physics", e.target.value)}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">Please provide physics marks.</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationChemistryMarks">
                                            <Form.Label>Chemistry</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Chemistry Marks"
                                                value={marks.chemistry}
                                                onChange={(e) => handleMarksChange("chemistry", e.target.value)}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">Please provide chemistry marks.</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationTotalMarks">
                                            <Form.Label>Total Marks</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Total Marks"
                                                value={totalMarks}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </>
                                )}
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedCountry}
                                        onChange={(e) => {
                                            setSelectedCountry(e.target.value);
                                            setSelectedState("");
                                            setSelectedDistrict("");
                                        }}
                                        required
                                    >
                                        <option value="" disabled>Select Country</option>
                                        {Object.keys(locations).map((country) => (
                                            <option key={country} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">Please select a country.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedState}
                                        onChange={(e) => {
                                            setSelectedState(e.target.value);
                                            setSelectedDistrict("");
                                        }}
                                        required
                                        disabled={!selectedCountry}
                                    >
                                        <option value="" disabled>Select State</option>
                                        {selectedCountry && Object.keys(locations[selectedCountry]).map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">Please select a state.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationDistrict">
                                    <Form.Label>District</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedDistrict}
                                        onChange={(e) => setSelectedDistrict(e.target.value)}
                                        required
                                        disabled={!selectedState}
                                    >
                                        <option value="" disabled>Select District</option>
                                        {selectedState && locations[selectedCountry][selectedState].map((district) => (
                                            <option key={district} value={district}>
                                                {district}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">Please select a district.</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationPincode">
                                    <Form.Label>Pincode</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Pincode"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">Please provide a valid pincode.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="8" controlId="validationAbout">
                                    <Form.Label>About</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="About yourself"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">Please provide information about yourself.</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <div className="button-group">
                                <Button type="submit" variant="primary">Submit form</Button>
                                <Button variant="secondary" onClick={handleReset}>Reset form</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
