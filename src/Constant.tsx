export const regexValidation = {
    emailFormat:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.+([a-zA-Z0-9-]+)2*$/,
};

const data = 
    {
        "group_code": "default_profile",
        "data": {
            "default_profile": {
                "name": "Default",
                "query": "default",
                "category_id": {
                    "label": "Automotive & Motorcycle>Car Electronics>Car Audio",
                    "value": 931336
                },
                "data": [
                    {
                        "data_type": "attribute_data",
                        "id": 1,
                        "data": {
                            "product_attributes": {
                                "100107": {
                                    "type": "predefined",
                                    "value": "1000054",
                                    "required": false,
                                    "displayName": "Warranty Type",
                                    "id": "100107",
                                    "customSelectValuesLength": 4
                                },
                                "100243": {
                                    "type": "fixed",
                                    "value": "Loud",
                                    "required": false,
                                    "displayName": "Amplifier Type",
                                    "id": "100243",
                                    "customSelectValuesLength": 0
                                },
                            },
                            "variation_attributes": {
                                "Colour": {
                                    "type": "attribute",
                                    "value": [
                                        "size",
                                        "nods"
                                    ],
                                    "required": false,
                                    "displayName": "Colour",
                                    "id": "100000"
                                },
                                "Specification": {
                                    "type": "attribute",
                                    "value": [
                                        "nods",
                                        "color"
                                    ],
                                    "required": false,
                                    "displayName": "Specification",
                                    "id": "100089"
                                }
                            }
                        }
                    },
                    {
                        "data_type": "price_optimize",
                        "id": 2,
                        "data": {
                            "price_template": "none",
                            "price_template_value": "0"
                        }
                    }
                ],
                "attributes_mapping": {
                    "product_attributes": {
                        "100107": {
                            "type": "predefined",
                            "value": "1000054",
                            "required": false,
                            "displayName": "Warranty Type",
                            "id": "100107",
                            "customSelectValuesLength": 4
                        },
                        "100243": {
                            "type": "fixed",
                            "value": "Loud",
                            "required": false,
                            "displayName": "Amplifier Type",
                            "id": "100243",
                            "customSelectValuesLength": 0
                        },
                    },
                    "variation_attributes": {
                        "Colour": {
                            "type": "attribute",
                            "value": [
                                "size",
                                "nods"
                            ],
                            "required": false,
                            "displayName": "Colour",
                            "id": "100000"
                        },
                        "Specification": {
                            "type": "attribute",
                            "value": [
                                "nods",
                                "color"
                            ],
                            "required": false,
                            "displayName": "Specification",
                            "id": "100089"
                        }
                    }
                },
            }
        }
    }
