#include <queue>
#include <stdint.h>
#include <stdio.h>
#include <string>
#include <vector>

using namespace std;

namespace Advent2018
{
	typedef int64_t regType;
	//typedef unsigned regType;

    enum AssemblyParserOperation
    {
        Set,
        Add,
        Mul,
		Eq,
		Gt,
		Ban,
		Bor
    };

    struct AssemblyParserInstruction
    {
        AssemblyParserOperation operation;
		char sourceCode[80 + 1];
        bool isFirstOperandRegister;
        regType firstOperand;
        bool isSecondOperandRegister;
		regType secondOperand;
		regType thirdOperand;
	};

    class AssemblyParser
    {
    public:
        AssemblyParser() :
			m_ipRegNum(0)
        {
        }

        void parseInstruction(const char *line)
        {
            char mutableLine[80 + 1] = {0};
            (void)strncpy_s(mutableLine, line, _countof(mutableLine));
            char *context = nullptr;
            auto instructionToken = strtok_s(mutableLine, " \t", &context);
            if (instructionToken != nullptr)
            {
                AssemblyParserInstruction instruction;
                (void)memset(&instruction, 0, sizeof(instruction));
				(void)strcpy_s(instruction.sourceCode, _countof(instruction.sourceCode), line);
                do
                {
					instruction.isFirstOperandRegister = true;
					instruction.isSecondOperandRegister = false;
					if (strcmp(instructionToken, "setr") == 0) { instruction.operation = Set; instruction.isFirstOperandRegister = true; break; }
					if (strcmp(instructionToken, "seti") == 0) { instruction.operation = Set; instruction.isFirstOperandRegister = false; break; }
					if (strcmp(instructionToken, "addr") == 0) { instruction.operation = Add; instruction.isSecondOperandRegister = true; break; }
					if (strcmp(instructionToken, "addi") == 0) { instruction.operation = Add; instruction.isSecondOperandRegister = false; break; }
					if (strcmp(instructionToken, "mulr") == 0) { instruction.operation = Mul; instruction.isSecondOperandRegister = true; break; }
					if (strcmp(instructionToken, "muli") == 0) { instruction.operation = Mul; instruction.isSecondOperandRegister = false; break; }
					if (strcmp(instructionToken, "banr") == 0) { instruction.operation = Ban; instruction.isSecondOperandRegister = true; break; }
					if (strcmp(instructionToken, "bani") == 0) { instruction.operation = Ban; instruction.isSecondOperandRegister = false; break; }
					if (strcmp(instructionToken, "borr") == 0) { instruction.operation = Bor; instruction.isSecondOperandRegister = true; break; }
					if (strcmp(instructionToken, "bori") == 0) { instruction.operation = Bor; instruction.isSecondOperandRegister = false; break; }
					if (strcmp(instructionToken, "eqir") == 0) { instruction.operation = Eq;  instruction.isFirstOperandRegister = false; instruction.isSecondOperandRegister = true; break; }
					if (strcmp(instructionToken, "eqri") == 0) { instruction.operation = Eq;  instruction.isFirstOperandRegister = true; instruction.isSecondOperandRegister = false; break; }
					if (strcmp(instructionToken, "eqrr") == 0) { instruction.operation = Eq;  instruction.isFirstOperandRegister = true; instruction.isSecondOperandRegister = true; break; }
					if (strcmp(instructionToken, "gtir") == 0) { instruction.operation = Gt;  instruction.isFirstOperandRegister = false; instruction.isSecondOperandRegister = true; break; }
					if (strcmp(instructionToken, "gtri") == 0) { instruction.operation = Gt;  instruction.isFirstOperandRegister = true; instruction.isSecondOperandRegister = false; break; }
					if (strcmp(instructionToken, "gtrr") == 0) { instruction.operation = Gt;  instruction.isFirstOperandRegister = true; instruction.isSecondOperandRegister = true; break; }
                } while (0);

                auto nextToken = strtok_s(nullptr, " \t", &context);
                if (nextToken != nullptr)
                {
                    instruction.firstOperand = instruction.isFirstOperandRegister ? nextToken[0] - '0' : atoi(nextToken);
                }

                nextToken = strtok_s(nullptr, " \t", &context);
                if (nextToken != nullptr)
                {
                    instruction.secondOperand = instruction.isSecondOperandRegister ? nextToken[0] - '0' : atoi(nextToken);
                }

				nextToken = strtok_s(nullptr, " \t", &context);
				if (nextToken != nullptr)
				{
					instruction.thirdOperand = nextToken[0] - '0';
				}

				m_program.push_back(instruction);
            }
        }

        void executeProgram(regType initialRegisterZeroValue = 0)
        {
            clearState();
			m_registers[0][0] = initialRegisterZeroValue;
			auto numExecuted = 0u, num28Reached = 0u;
            for (size_t programCounter = 0; programCounter >= 0 && programCounter < m_program.size(); ++programCounter)
            {
				//cout << "ip=" << programCounter << " ";
				//logRegisters();
				if (programCounter == 28)
				{
					//cout << "reached magic instruction at ip=28!" << " ";
					//logRegisters();
					cout << m_registers[5][0];
					cout << endl;
					++num28Reached;
					if (num28Reached == 100 * 1000) return;
				}
                programCounter = executeInstructionReturningProgramCounter(programCounter, m_program[programCounter]);
				if (false && numExecuted % (10 * 1000 * 1000) == 0)
				{
					cout << "numExecuted=" << numExecuted << ", ip=" << programCounter << " ";
					logRegisters();
					cout << " ";
					logRegisterMinMaxValues();
					//cout << endl;
					(void)printf("                    \r");
				}
				++numExecuted;
            }
        }

		void setIpRegNum(unsigned value) { m_ipRegNum = value; }
		regType getRegisterZero() { return m_registers[0][0]; }

    private:
        void clearState()
        {
            for (size_t i = 0; i < _countof(m_registers); ++i)
                for (size_t j = 0; j < _countof(m_registers[0]); ++j)
                    m_registers[i][j] = 0;

			for (size_t i = 0; i < _countof(m_registers); ++i)
			{
				m_minRegisterValues[i] = (regType)-1;
				m_maxRegisterValues[i] = 0;
			}
        }

		void logRegisters()
		{
			cout << "[";
			for (size_t i = 0; i < _countof(m_registers); ++i)
				cout << ((i != 0) ? ", " : "") << m_registers[i][0];
			cout << "]";
		}

		void logRegisterMinMaxValues()
		{
			cout << "{";
			for (size_t i = 0; i < _countof(m_registers); ++i)
				cout << ((i != 0) ? ", " : "") << m_minRegisterValues[i] << "-" << m_maxRegisterValues[i];
			cout << "}";
		}

		size_t executeInstructionReturningProgramCounter(size_t programCounter, const AssemblyParserInstruction& instruction, bool multiProcess = false, size_t processId = 0)
        {
			m_registers[m_ipRegNum][0] = programCounter;

			//cout << " " << instruction.sourceCode << " ";
            auto firstOperand = firstOperandValue(instruction, processId);
            auto secondOperand = secondOperandValue(instruction, processId);
            switch (instruction.operation)
            {
            case Set: setRegister(instruction, firstOperand, processId);
				logOneOperandExecution("set", firstOperand, processId);
                break;
            case Add: setRegister(instruction, firstOperand + secondOperand, processId);
                logTwoOperandExecution("add", firstOperand, secondOperand, processId);
                break;
			case Mul: setRegister(instruction, firstOperand * secondOperand, processId);
				logTwoOperandExecution("mul", firstOperand, secondOperand, processId);
				break;
			case Ban: setRegister(instruction, firstOperand & secondOperand, processId);
				logTwoOperandExecution("ban", firstOperand, secondOperand, processId);
				break;
			case Bor: setRegister(instruction, firstOperand | secondOperand, processId);
				logTwoOperandExecution("bor", firstOperand, secondOperand, processId);
				break;
			case  Eq: setRegister(instruction, (firstOperand == secondOperand) ? 1 : 0, processId);
				logTwoOperandExecution("eq", firstOperand, secondOperand, processId);
				break;
			case  Gt: setRegister(instruction, (firstOperand > secondOperand) ? 1 : 0, processId);
                logTwoOperandExecution("gt", firstOperand, secondOperand, processId);
                break;
            default:
                break;
            }

			return m_registers[m_ipRegNum][0];
        }

        void logOneOperandExecution(const char *instructionName, regType operandValue, size_t processId)
        {
            //(void)printf("%zu: %s %lld\n", processId, instructionName, operandValue);
        }

        void logTwoOperandExecution(const char *instructionName, regType firstOperandValue, regType secondOperandValue, size_t processId)
        {
            //(void)printf("%zu: %s %lld %lld\n", processId, instructionName, firstOperandValue, secondOperandValue);
        }

        void setRegister(const AssemblyParserInstruction& instruction, regType value, size_t processId)
        {
			auto third = instruction.thirdOperand;
			// if (third == 5) cout << "register 5 set with " << value << endl;
            m_registers[third][processId] = value;
			if (value < m_minRegisterValues[third]) m_minRegisterValues[third] = value;
			if (value > m_maxRegisterValues[third]) m_maxRegisterValues[third] = value;
		}

        regType firstOperandValue(const AssemblyParserInstruction& instruction, size_t processId)
        {
            return operandValue(instruction.isFirstOperandRegister, instruction.firstOperand, processId);
        }

        regType secondOperandValue(const AssemblyParserInstruction& instruction, size_t processId)
        {
            return operandValue(instruction.isSecondOperandRegister, instruction.secondOperand, processId);
        }

        regType operandValue(bool isOperandRegister, regType operand, size_t processId)
        {
            return isOperandRegister ? m_registers[operand][processId] : operand;
        }

        std::vector<AssemblyParserInstruction> m_program;
		unsigned m_ipRegNum;
		regType m_registers[6][1];
		regType m_minRegisterValues[6];
		regType m_maxRegisterValues[6];
    };
}
