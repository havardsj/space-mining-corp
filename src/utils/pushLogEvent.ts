export default function pushLogEvent(gameStore: any, eventMessage: string) {
	gameStore.log.push(
		`[Year: ${gameStore.time.year} - Month: ${gameStore.time.month}] ${eventMessage}`
	);
}
