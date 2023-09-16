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
    const [formData, setFormData] = useState({
        name: '',
        fatherName: '',
        cnic: '',
        email: '',
        whatsappNo: '',
        college: '',
        country: '',
        hasRelativeInCYC: '',
        relativeName: '-',
        relation: '-',
        relativePostalAddress: '-',
        workedForNGO: '',
        planningToMove: ''
    });

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
            "entry.1578887118": formData.relativeName,  // Assuming the might not always have the 'relativeName' field
            "entry.37821331": formData.relation, // Assuming the might not always have the 'relation' field
            "entry.418957481": formData.relativePostalAddress, // Assuming the might not always have the 'relativePostalAddress' field
            "entry.273056476": formData.workedForNGO,
            "entry.1470184077": formData.planningToMove
        };

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
                            <Input placeholder="Enter your name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Father Name</FormLabel>
                            <Input placeholder="Enter your father's name" value={formData.fatherName} onChange={(e) => handleInputChange('fatherName', e.target.value)} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>CNIC/Passport</FormLabel>
                            <Input placeholder="Enter your CNIC or Passport number" value={formData.cnic} onChange={(e) => handleInputChange('cnic', e.target.value)} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="Enter your email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Whatsapp No.</FormLabel>
                            <Input placeholder="Enter your Whatsapp number" value={formData.whatsappNo} onChange={(e) => handleInputChange('whatsappNo', e.target.value)} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>College/Universiy</FormLabel>
                            <Input placeholder="College or University" value={formData.college} onChange={(e) => handleInputChange('college', e.target.value)} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Country</FormLabel>
                            <Select placeholder="Select your country" value={formData.country} onChange={(e) => handleInputChange('country', e.target.value)}>
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Do you have a relative in Commonwealth Youth Council(CYC)?</FormLabel>
                            <RadioGroup value={formData.hasRelativeInCYC} onChange={(value) => handleInputChange('hasRelativeInCYC', value)}>
                                <Stack direction="row">
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        {/* {hasRelativeInCYC && (
                            <> */}
                                <FormControl isRequired>
                                    <FormLabel>Name of relative</FormLabel>
                                    <Input placeholder="Enter relative's name" value={formData.relativeName} onChange={(e) => handleInputChange('relativeName', e.target.value)} />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Relation</FormLabel>
                                    <Input placeholder="Enter relation" value={formData.relation} onChange={(e) => handleInputChange('relation', e.target.value)} />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Postal address of relative</FormLabel>
                                    <Input placeholder="Enter postal address" value={formData.relativePostalAddress} onChange={(e) => handleInputChange('relativePostalAddress', e.target.value)} />
                                </FormControl>
                            {/* </>
                        )} */}
                        <FormControl isRequired>
                            <FormLabel>Have you ever worked for an International NGO?</FormLabel>
                            <RadioGroup value={formData.workedForNGO} onChange={(value) => handleInputChange('workedForNGO', value)}>
                                <Stack direction="row">
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Are you planning to move to England, Scotland, Wales, or Northern Ireland after graduation?</FormLabel>
                            <RadioGroup value={formData.planningToMove} onChange={(value) => handleInputChange('planningToMove', value)}>
                                <Stack direction="row">
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                    <Radio value="Maybe">Maybe</Radio>
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
