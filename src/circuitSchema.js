import { supportedControllersUISchema } from "./commonfields"

export const circuitsuiSchema = {
	circuit: {
		"ui:field": "tabbedarray",
		items: {
			"ui:field": "tabbedobject",
			"ui:options": {
				tabs: {
					Info: ['name', 'cost', 'supportedControllers'],
					Parts: ['partlist'],
					Blocks: ['blocks'],
					Coders: ['coders'],
					Wiring: ['ports', 'wires']
				}
			},
			supportedControllers: supportedControllersUISchema,
			partlist: {
				items: {
					"ui:readonly": true
				}
			},
			blocks: {
				"ui:options": {
					orderable: false
				},
				items: {
					blocks: {
						"ui:field": "typeahead",
						typeahead: {
							options: ["ADXL345", "ADXL335", "Resistor"],
							minLength: 0,
							multiple: true
						}
					}
				}
			},
		}
	}
}

export const circuitsSchema = {
	type: "object",
	properties: {
		circuit: {
			type: "array",
			title: "",
			items: {
				"type": "object",
				"properties": {
					name: {
						type: "string"
					},
					cost: {
						type: "integer",
						default: 0
					},
					supportedControllers: {
						type: "string"
					},
					partlist: {
						type: "array",
						items: { type: "string" }
					},
					blocks: {
						type: "array",
						title: "SupportBlocks [list only support and power blocks]",
						items: {
							type: "object",
							properties: {
								cost: {
									type: "integer",
									default: 0
								},
								blocks: {
									type: "string"
								}
							}
						}
					},
					coders: {
						type: "array",
						items: {
							type: "string",
							default: "",
							enum: ["ADXL345", "ADXL335", "Resistor", "Create New..."]
						}
					},
					wires: {
						type: "array",
						items: {
							type: "object",
							properties: {
								from: {
									type: "string",
									default: ""
								},
								to: {
									type: "string",
									default: ""
								}
							}
						}
					},
					ports: {
						type: "array",
						items: {
							type: "object",
							properties: {
								name: {
									type: "string",
									default: ""
								},
								codename: {
									title: "codename [show for category controller only]",
									type: "string",
									default: ""
								},
								unique: {
									type: "boolean"
								},
								includeInFirmware: {
									type: "boolean"
								},
								type: {
									type: "string",
									title: "type [toggles requiresSpecs or provdesSpecs]",
									enum: ["requires", "provides"]
								},
								requiresSpecs: {
									type: "array",
									items: {
										type: "object",
										properties: {
											priority: {
												type: "integer",
												default: 0
											},
											specs: {
												type: "string",
												enum: ["VCC", "GND", "SDA", "SCL", "SCK", "MISO", "MOSI"]
											},
											voltage: {
												type: "string",
												enum: ["3.3v", "3.7v", "5v", "6v", "7.4", "9v", "12v"]
											}
										}
									}
								},
								providesSpecs: {
									type: "array",
									items: {
										type: "object",
										properties: {
											specs: {
												type: "string",
												enum: ["VCC", "GND", "SDA", "SCL", "SCK", "MISO", "MOSI"]
											},
											voltages: {
												type: "array",
												items: {
													type: "string",
													enum: ["3.3v", "3.7v", "5v", "6v", "7.4", "9v", "12v"]
												},
												uniqueItems: true
											}
										}
									}
								},
								load: {
									type: "integer"
								}
							},
							depenedencies: {}
						}
					}
				}
			}
		}
	}
};
