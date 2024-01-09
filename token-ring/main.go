package main

import (
	"bufio"
	"os"
	"strconv"
	"strings"
)
import "fmt"

type Token struct {
	data      string
	recipient int
	ttl       int
}

type Node struct {
	id           int
	leftChannel  chan Token
	rightChannel chan Token
}

func (node Node) run(quit chan bool) {
	for {
		select {
		case <-quit:
			return
		case token := <-node.leftChannel:
			if token.recipient == node.id {
				fmt.Printf("Message \"%s\" recieved by %d\n", token.data, node.id)
				continue
			}

			token.ttl -= 1
			if token.ttl == 0 {
				println("TTL expired")
				continue
			}

			node.rightChannel <- token
		}
	}
}

func initNodes(nodesCount int, quit chan bool) Node {
	nodes := []Node{{id: 0, rightChannel: make(chan Token)}}

	for i := 1; i < nodesCount; i++ {
		nodes = append(nodes, Node{id: i, leftChannel: nodes[i-1].rightChannel, rightChannel: make(chan Token)})
	}

	nodes[0].leftChannel = nodes[nodesCount-1].rightChannel

	for i := 0; i < nodesCount; i++ {
		go nodes[i].run(quit)
	}

	return nodes[0]
}

func readLine() string {
	reader := bufio.NewReader(os.Stdin)
	text, _ := reader.ReadString('\n')
	text = strings.TrimSuffix(text, "\n")
	text = strings.TrimSuffix(text, "\r")

	return text
}

func handleMessageCommand() Token {
	fmt.Println("Enter message text: ")
	data := readLine()
	fmt.Println("Enter recipient id: ")
	recipient, _ := strconv.Atoi(readLine())
	fmt.Println("Enter ttl number: ")
	ttl, _ := strconv.Atoi(readLine())

	token := Token{data: data, recipient: recipient, ttl: ttl}
	return token
}

func waitCommand(node Node, quit chan bool) {
	fmt.Println("Commands: \"msg\", \"exit\".")
	for {
		fmt.Println("Enter the message or exit code: ")
		command := readLine()

		if command == "exit" {
			quit <- true
			break
		}
		if command == "msg" {
			token := handleMessageCommand()
			node.leftChannel <- token
		}
	}

}

func main() {
	fmt.Print("Enter count of nodes: ")

	quit := make(chan bool)
	nodeCount, _ := strconv.Atoi(readLine())
	node := initNodes(nodeCount, quit)

	waitCommand(node, quit)
}
