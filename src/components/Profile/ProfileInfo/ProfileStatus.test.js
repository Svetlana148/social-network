import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";


describe("ProfileStatus component", () => {
test("Status from props should be in the state", () => {
   const component = create(<ProfileStatus status = "our new status"/>);
	const instance = component.getInstance();
	expect(instance.state.status).toBe("our new status");

   // expect(button.toJSON()).toMatchSnapshot();
});
});