import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
    Stack,
    Radio,
    RadioGroup,
    Text
} from '@chakra-ui/react';
import Confetti from 'react-confetti';

const Form = () => {
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
        "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
        "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
        "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon",
        "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)",
        "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark",
        "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
        "Estonia", "Eswatini (fmr. Swaziland)", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
        "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See",
        "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
        "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
        "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
        "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
        "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal",
        "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia (formerly Macedonia)",
        "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru",
        "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
        "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
        "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
        "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan",
        "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
        "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay",
        "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

    const [showConfetti, setShowConfetti] = useState(false);
    const [hasRelativeInCYC, setHasRelativeInCYC] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({});

    const handleInputChange = (name, value) => {
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const handleRelativeChange = (value) => {
        setHasRelativeInCYC(value === "yes");
        handleInputChange('hasRelativeInCYC', value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formEntries = {
            "entry.1200313903": formData.name,
            "entry.1886733330": formData.fatherName,
            "entry.1426066189": formData.cnic,
            "entry.31463558": formData.email,
            "entry.1864483151": formData.whatsappNo,
            "entry.1377809651": formData.college,  // Assuming the might not always have the 'college' field
            "entry.658474298": formData.country,
            "entry.36535761": formData.hasRelativeInCYC,
            "entry.1578887118": formData.relativeName || '_',  // Assuming the might not always have the 'relativeName' field
            "entry.37821331": formData.relation || '_', // Assuming the might not always have the 'relation' field
            "entry.418957481": formData.relativePostalAddress || '_', // Assuming the might not always have the 'relativePostalAddress' field
            "entry.273056476": formData.workedForNGO,
            "entry.1470184077": formData.planningToMove
        };
        // const formEntries = {
        //     "entry.2158446": formData.name,
        //     "entry.2040070596": formData.fatherName,
        //     "entry.450925682": formData.cnic,
        //     "entry.1729225793": formData.email,
        //     "entry.2127968864": formData.whatsappNo,
        //     "entry.1052229299": formData.college,  // Assuming the formData might not always have the 'college' field
        //     "entry.1369234903": formData.country,
        //     "entry.472403008": formData.hasRelativeInCYC,
        //     "entry.1060629598": formData.relativeName || '_',  // Assuming the formData might not always have the 'relativeName' field
        //     "entry.1494358699": formData.relation || '_', // Assuming the formData might not always have the 'relation' field
        //     "entry.1887889065": formData.relativePostalAddress || '_', // Assuming the formData might not always have the 'relativePostalAddress' field
        //     "entry.986365769": formData.workedForNGO,
        //     "entry.1110019471": formData.planningToMove
        // };

        const googleFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdqAY0g8-ioUnLYqiKaKNkaLiCRdXkC_DYtBsB-QtXpC-4m7w/formResponse';
   
        const urlEncodedData = new URLSearchParams(formEntries);
        console.log(urlEncodedData, formEntries)

        try {
            await fetch(googleFormURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedData.toString()
            });

            setIsSubmitted(true);
            setShowConfetti(true);
        } catch (error) {
            console.error("Error submitting form: ", error);
        }
    }


    return (
        <Box margin="0 auto" padding="4">
            {showConfetti && <Confetti />}
            {isSubmitted ? (
                <Text fontSize="2xl" textAlign="center">
                    🎉 Thank you for registering! 🎉
                    <br />
                    We will keep you updated on the event and send you a reminder before the event.
                </Text>
            ) : (
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="Enter your name" onChange={(e) => handleInputChange('name', e.target.value)} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Father Name</FormLabel>
                            <Input placeholder="Enter your father's name" onChange={(e) => handleInputChange('fatherName', e.target.value)} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>CNIC/Passport</FormLabel>
                            <Input placeholder="Enter your CNIC or Passport number" onChange={(e) => handleInputChange('cnic', e.target.value)} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="Enter your email" type="email" onChange={(e) => handleInputChange('email', e.target.value)} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Whatsapp No.</FormLabel>
                            <Input placeholder="Enter your Whatsapp number" onChange={(e) => handleInputChange('whatsappNo', e.target.value)} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>College/Universiy</FormLabel>
                            <Input placeholder="College or University" onChange={(e) => handleInputChange('college', e.target.value)} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Country</FormLabel>
                            <Select placeholder="Select your country" onChange={(e) => handleInputChange('country', e.target.value)}>
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Do you have a relative in Commonwealth Youth Council(CYC)?</FormLabel>
                            <RadioGroup onChange={(value) => handleRelativeChange(value)}>
                                <Stack direction="row">
                                    <Radio value="yes">Yes</Radio>
                                    <Radio value="no">No</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        {hasRelativeInCYC && (
                            <>
                                <FormControl isRequired>
                                    <FormLabel>Name of relative</FormLabel>
                                    <Input placeholder="Enter relative's name" onChange={(e) => handleInputChange('relativeName', e.target.value)} />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Relation</FormLabel>
                                    <Input placeholder="Enter relation" onChange={(e) => handleInputChange('relation', e.target.value)} />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Postal address of relative</FormLabel>
                                    <Input placeholder="Enter postal address" onChange={(e) => handleInputChange('relativePostalAddress', e.target.value)} />
                                </FormControl>
                            </>
                        )}

                        <FormControl isRequired>
                            <FormLabel>Have you ever worked for an International NGO?</FormLabel>
                            <RadioGroup onChange={(value) => handleInputChange('workedForNGO', value)}>
                                <Stack direction="row">
                                    <Radio value="yes">Yes</Radio>
                                    <Radio value="no">No</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Are you planning to move to England, Scotland, Wales, or Northern Ireland after graduation?</FormLabel>
                            <RadioGroup onChange={(value) => handleInputChange('planningToMove', value)}>
                                <Stack direction="row">
                                    <Radio value="yes">Yes</Radio>
                                    <Radio value="no">No</Radio>
                                    <Radio value="maybe">Maybe</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <Button mt={4} colorScheme="blue" type="submit">Submit</Button>
                    </Stack>
                </form>
            )
            }
        </Box >
    );
}

export default Form;



// import React, { useState } from 'react';
// import {
//     Box,
//     FormControl,
//     FormLabel,
//     Input,
//     Button,
//     Text
// } from '@chakra-ui/react';
// import Confetti from 'react-confetti';

// const Form = () => {
//     const [showConfetti, setShowConfetti] = useState(false);
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [name, setName] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const googleFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdqAY0g8-ioUnLYqiKaKNkaLiCRdXkC_DYtBsB-QtXpC-4m7w/formResponse';
//         const formEntry = {
//             "entry.1028146357": name
//         };

//         const urlEncodedData = new URLSearchParams(formEntry);

//         try {
//             await fetch(googleFormURL, {
//                 method: 'POST',
//                 mode: 'no-cors',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 },
//                 body: urlEncodedData.toString()
//             });

//             setIsSubmitted(true);
//             setShowConfetti(true);
//         } catch (error) {
//             console.error("Error submitting form: ", error);
//         }
//     }

//     return (
//         <Box margin="0 auto" padding="4">
//             {showConfetti && <Confetti />}
//             {isSubmitted ? (
//                 <Text fontSize="2xl" textAlign="center">
//                     🎉 Thank you for registering! 🎉
//                 </Text>
//             ) : (
//                 <form onSubmit={handleSubmit}>
//                     <FormControl isRequired>
//                         <FormLabel>Name</FormLabel>
//                         <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
//                     </FormControl>

//                     <Button mt={4} colorScheme="blue" type="submit">Submit</Button>
//                 </form>
//             )}
//         </Box>
//     );
// }

// export default Form;
