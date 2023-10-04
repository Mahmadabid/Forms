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
import { countries } from "./country";

const Form = () => {

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
        relativeName: '',
        relation: '',
        relativePostalAddress: '',
        workedForNGO: '',
        planningToMove: ''
    });

    const handleInputChange = (name, value) => {
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const handleRelativeChange = (value) => {
        handleInputChange('hasRelativeInCYC', value);
        if (value === 'Yes') {
            setHasRelativeInCYC(true)
        }
        else {
            setHasRelativeInCYC(false)
            setFormData(prevState => ({
                ...prevState,
                relativeName: '',
                relation: '',
                relativePostalAddress: ''
            }))
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formEntries = {
            "entry.1200313903": formData.name,
            "entry.1013104810": formData.fatherName,
            "entry.1180421350": formData.cnic,
            "entry.1606369737": formData.email,
            "entry.2051707402": formData.whatsappNo,
            "entry.45235486": formData.college,
            "entry.523299909": formData.country,
            "entry.1990961655": formData.hasRelativeInCYC,
            "entry.1900030160": formData.relativeName,
            "entry.1924548859": formData.relation,
            "entry.1852414651": formData.relativePostalAddress,
            "entry.1780404399": formData.workedForNGO,
            "entry.1369126912": formData.planningToMove
        };

        const googleFormURL = process.env.FormURL;

        const urlEncodedData = new URLSearchParams(formEntries);

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
                            <FormLabel>Do you have a relative in CYC?</FormLabel>
                            <RadioGroup value={formData.hasRelativeInCYC} onChange={(value) => handleRelativeChange(value)}>
                                <Stack direction="row">
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        {hasRelativeInCYC ? (
                            <>
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
                            </>) : (<></>)
                        }
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
