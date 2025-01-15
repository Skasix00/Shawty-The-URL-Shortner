"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
	const [url, setURL] = useState("");
	const [links, setLinks] = useState([]);

	const handleUrlCreation = async (e) => {
		e.preventDefault();
		const result = await fetch("/api/shorten", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ url }),
		});

		setURL("");
		await refreshLinks();
	};

	const fetchData = async () => {
		const result = await fetch("/api/links");
		const data = await result.json();
		return data || {};
	};

	const refreshLinks = async () => {
		const linkObject = await fetchData();
		console.log(JSON.stringify(linkObject));
		setLinks(linkObject);
	};

	const onShortUrlClick = async (short) => {
		const url = `http://localhost:3000/go/${short}`;
		navigator.clipboard.writeText(url).then(
			() => {
				console.log("copied");
			},
			() => {
				console.log("Failed.");
			}
		);
	};

	useEffect(() => {
		(async () => {
			await refreshLinks();
		})();
	}, []);

	return (
		<>
			<div>
				<h2 className={styles.center}>MY URL SHORTENER</h2>
				<div className={styles.centeredInput}>
					<div className={styles.centeredInputContent}>
						<input type='text' id='url' placeholder='Enter URL' value={url} onChange={(e) => setURL(e.target.value)} />
						<button className={styles.styledButton} id='shorten' onClick={handleUrlCreation}>
							Shorten
						</button>
					</div>
				</div>
			</div>
			<div className={styles.centeredTable}>
				{Object.entries(links).length > 0 ? (
					<table className={[styles.table, "table table-bordered"].join(" ")}>
						<thead>
							<tr>
								<th>Short Url</th>
								<th>Long Url</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(links).map(([short, long]) => (
								<tr key={short}>
									<td style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => onShortUrlClick(short)}>
										{`http://localhost:3000/api/go/${short}`}
									</td>
									<td>{long}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p className={styles.noLink}>No links available</p>
				)}
			</div>
		</>
	);
}
