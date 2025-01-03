import { ConfirmationDialog, ConfirmationOptions } from "@/components/ui/ConfirmDialog";
import { createContext, useContext, useRef, useState } from "react";


const ConfirmationServiceContext = createContext<
	(options: ConfirmationOptions) => Promise<void>
	>(() => Promise.reject());

export const useConfirmation = () => useContext(ConfirmationServiceContext);

type ConfirmationServiceProviderTypes = {
	children: React.ReactNode;
}

export const ConfirmationServiceProvider = ({ children }: ConfirmationServiceProviderTypes) => {
	const [
		confirmationState,
		setConfirmationState
	] = useState<ConfirmationOptions | null>(null);

	const [ openConfirm, setOpenConfirm ] = useState(false);

	const awaitingPromiseRef = useRef<{
		resolve: () => void;
		reject: () => void;
	}>();

	const openConfirmation = (options: ConfirmationOptions) => {
		setConfirmationState(options);
		
		setTimeout(() => {
			setOpenConfirm(true);	
		}, 100);
		
		return new Promise<void>((resolve, reject) => {
			awaitingPromiseRef.current = { resolve, reject };
		});
	};

	const handleClose = () => {
		if (confirmationState?.catchOnCancel && awaitingPromiseRef.current) {
			awaitingPromiseRef.current.reject();
		}

		setOpenConfirm(false);
		
		setTimeout(() => {
			setConfirmationState(null);
		}, 300);
	};

	const handleSubmit = () => {
		if (awaitingPromiseRef.current) {
			awaitingPromiseRef.current.resolve();
		}

		setOpenConfirm(false);

		setTimeout(() => {
			setConfirmationState(null);
		}, 300);
	};

	return (
		<>
			<ConfirmationServiceContext.Provider value={openConfirmation}>
				{children}
			</ConfirmationServiceContext.Provider>
				

			<ConfirmationDialog
				open={openConfirm}
				onSubmit={handleSubmit}
				onClose={handleClose}
				{...confirmationState}
			/>
		</>
	);
};
