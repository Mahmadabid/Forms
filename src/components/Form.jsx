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

    const handleRelativeChange = (value) => {
        if (value === "yes") {
            setHasRelativeInCYC(true);
        } else {
            setHasRelativeInCYC(false);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        setShowConfetti(true);
        // Handle your form submission logic here if needed
    }

    return (
        <Box margin="0 auto" padding="4" overflowX="hidden">
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
                            <Input placeholder="Enter your name" />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Father Name</FormLabel>
                            <Input placeholder="Enter your father's name" />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>CNIC/Passport</FormLabel>
                            <Input placeholder="Enter your CNIC or Passport number" />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="Enter your email" type="email" />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Whatsapp No.</FormLabel>
                            <Input placeholder="Enter your Whatsapp number" />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Country</FormLabel>
                            <Select placeholder="Select your country">
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Do you have a relative in Commonwealth Youth Council(CYC)?</FormLabel>
                            <RadioGroup onChange={value => handleRelativeChange(value)}>
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
                                    <Input placeholder="Enter relative's name" />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Relation</FormLabel>
                                    <Input placeholder="Enter relation" />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Postal address of relative</FormLabel>
                                    <Input placeholder="Enter postal address" />
                                </FormControl>
                            </>
                        )}

                        <FormControl isRequired>
                            <FormLabel>Have you ever worked for an International NGO?</FormLabel>
                            <RadioGroup>
                                <Stack direction="row">
                                    <Radio value="yes">Yes</Radio>
                                    <Radio value="no">No</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Are you planning to move to England, Scotland, Wales, or Northern Ireland after graduation?</FormLabel>
                            <RadioGroup>
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
            )}
        </Box>
    );
}

export default Form;
