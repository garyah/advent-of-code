#include <queue>
#include <stdint.h>
#include <string>
#include <vector>

namespace Advent2017
{
    class Day23AssemblyParser
    {
    public:
        Day23AssemblyParser() :
            m_numberOfMulsInvoked(0)
        {
        }

        void parseInstruction(const char *line)
        {
            char mutableLine[80] = {0};
            (void)strncpy_s(mutableLine, line, _countof(mutableLine));
            char *context = nullptr;
            auto instructionToken = strtok_s(mutableLine, " \t", &context);
            if (instructionToken != nullptr)
            {
                AssemblyParserInstruction instruction;
                (void)memset(&instruction, 0, sizeof(instruction));
                do
                {
                    if (strcmp(instructionToken, "set") == 0) { instruction.operation = Set; break; }
                    if (strcmp(instructionToken, "sub") == 0) { instruction.operation = Sub; break; }
                    if (strcmp(instructionToken, "mul") == 0) { instruction.operation = Mul; break; }
                    if (strcmp(instructionToken, "jnz") == 0) { instruction.operation = Jnz; break; }
                } while (0);

                auto nextToken = strtok_s(nullptr, " \t", &context);
                if (nextToken != nullptr)
                {
                    instruction.isFirstOperandRegister = isalpha(nextToken[0]) ? true : false;
                    instruction.firstOperand = isalpha(nextToken[0]) ? toupper(nextToken[0]) - 'A' : atoi(nextToken);
                }

                nextToken = strtok_s(nullptr, " \t", &context);
                if (nextToken != nullptr)
                {
                    instruction.isSecondOperandRegister = isalpha(nextToken[0]) ? true : false;
                    instruction.secondOperand = isalpha(nextToken[0]) ? toupper(nextToken[0]) - 'A' : atoi(nextToken);
                }

                m_program.push_back(instruction);
            }
        }

        void executeProgram()
        {
            clearState();
            for (size_t programCounter = 0; programCounter >= 0 && programCounter < m_program.size(); ++programCounter)
            {
                programCounter = executeInstructionReturningProgramCounter(programCounter, m_program[programCounter]);
                // if (m_valueRecovered) break;
            }
        }

        void executeProgramV2()
        {
            clearState();
            m_registers['P' - 'A'][0] = 0;
            m_registers['P' - 'A'][1] = 1;
            for (size_t programCounter0 = 0, programCounter1 = 0;
                programCounter0 >= 0 && programCounter0 < m_program.size()
                || programCounter1 >= 0 && programCounter1 < m_program.size();
                ++programCounter0, ++programCounter1)
            {
                auto savedCounter0 = programCounter0;
                auto savedCounter1 = programCounter1;
                if (programCounter0 >= 0 && programCounter0 < m_program.size())
                    programCounter0 = executeInstructionReturningProgramCounter(programCounter0, m_program[programCounter0], true, 0);
                if (programCounter1 >= 0 && programCounter1 < m_program.size())
                    programCounter1 = executeInstructionReturningProgramCounter(programCounter1, m_program[programCounter1], true, 1);
                if (programCounter0 - savedCounter0 == -1 && programCounter1 - savedCounter1 == -1)   // DEADLOCK!
                    break;
            }
        }

        unsigned getnumberOfMulsInvoked() { return m_numberOfMulsInvoked; }

    private:
        enum AssemblyParserOperation
        {
            Set,
            Sub,
            Mul,
            Jnz
        };

        struct AssemblyParserInstruction
        {
            AssemblyParserOperation operation;
            bool isFirstOperandRegister;
            int64_t firstOperand;
            bool isSecondOperandRegister;
            int64_t secondOperand;
        };

        void clearState()
        {
            for (size_t i = 0; i < _countof(m_registers); ++i)
                for (size_t j = 0; j < _countof(m_registers[0]); ++j)
                    m_registers[i][j] = 0;

            m_numberOfMulsInvoked = 0;

            while (!m_interProcessQueue[0].empty()) m_interProcessQueue[0].pop();
            while (!m_interProcessQueue[1].empty()) m_interProcessQueue[1].pop();
        }

        size_t executeInstructionReturningProgramCounter(size_t programCounter, const AssemblyParserInstruction& instruction, bool multiProcess = false, size_t processId = 0)
        {
            auto firstOperand = firstOperandValue(instruction, processId);
            auto secondOperand = secondOperandValue(instruction, processId);
            switch (instruction.operation)
            {
            case Set: setRegister(instruction, secondOperand, processId);
                logTwoOperandExecution("set", firstOperand, secondOperand, processId);
                break;
            case Sub: setRegister(instruction, firstOperand - secondOperand, processId);
                logTwoOperandExecution("sub", firstOperand, secondOperand, processId);
                break;
            case Mul: setRegister(instruction, firstOperand * secondOperand, processId);
                ++m_numberOfMulsInvoked;
                logTwoOperandExecution("mul", firstOperand, secondOperand, processId);
                break;
            case Jnz:
                if (firstOperand != 0 && (secondOperand < 0 || secondOperand > 1))
                    --programCounter += secondOperand;
                logTwoOperandExecution("jnz", firstOperand, secondOperand, processId);
                break;
            default:
                break;
            }
            return programCounter;
        }

        void logOneOperandExecution(const char *instructionName, int64_t operandValue, size_t processId)
        {
            //(void)printf("%zu: %s %lld\n", processId, instructionName, operandValue);
        }

        void logTwoOperandExecution(const char *instructionName, int64_t firstOperandValue, int64_t secondOperandValue, size_t processId)
        {
            //(void)printf("%zu: %s %lld %lld\n", processId, instructionName, firstOperandValue, secondOperandValue);
        }

        void setRegister(const AssemblyParserInstruction& instruction, int64_t value, size_t processId)
        {
            if (instruction.isFirstOperandRegister)
                m_registers[instruction.firstOperand][processId] = value;
        }

        int64_t firstOperandValue(const AssemblyParserInstruction& instruction, size_t processId)
        {
            return operandValue(instruction.isFirstOperandRegister, instruction.firstOperand, processId);
        }

        int64_t secondOperandValue(const AssemblyParserInstruction& instruction, size_t processId)
        {
            return operandValue(instruction.isSecondOperandRegister, instruction.secondOperand, processId);
        }

        int64_t operandValue(bool isOperandRegister, int64_t operand, size_t processId)
        {
            return isOperandRegister ? m_registers[operand][processId] : operand;
        }

        std::vector<AssemblyParserInstruction> m_program;
        int64_t m_registers[8][2];
        unsigned m_numberOfMulsInvoked;
        std::queue<int64_t> m_interProcessQueue[2];
    };
}
