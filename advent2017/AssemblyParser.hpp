#include <queue>
#include <stdint.h>
#include <string>
#include <vector>

namespace Advent2017
{
    enum AssemblyParserOperation
    {
        Snd,
        Set,
        Add,
        Mul,
        Mod,
        Rcv,
        Jgz
    };

    struct AssemblyParserInstruction
    {
        AssemblyParserOperation operation;
        bool isFirstOperandRegister;
        int64_t firstOperand;
        bool isSecondOperandRegister;
        int64_t secondOperand;
    };

    class AssemblyParser
    {
    public:
        AssemblyParser() :
            m_soundPlayed(false),
            m_valueRecovered(false),
            m_numberOfSends(0)
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
                    if (strcmp(instructionToken, "snd") == 0) { instruction.operation = Snd; break; }
                    if (strcmp(instructionToken, "set") == 0) { instruction.operation = Set; break; }
                    if (strcmp(instructionToken, "add") == 0) { instruction.operation = Add; break; }
                    if (strcmp(instructionToken, "mul") == 0) { instruction.operation = Mul; break; }
                    if (strcmp(instructionToken, "mod") == 0) { instruction.operation = Mod; break; }
                    if (strcmp(instructionToken, "rcv") == 0) { instruction.operation = Rcv; break; }
                    if (strcmp(instructionToken, "jgz") == 0) { instruction.operation = Jgz; break; }
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
                if (m_valueRecovered) break;
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

        int64_t getFirstRecoveryValue() { return m_firstRecoveryValue; }

        unsigned getnumberOfSends() { return m_numberOfSends; }

    private:
        void clearState()
        {
            for (size_t i = 0; i < _countof(m_registers); ++i)
                for (size_t j = 0; j < _countof(m_registers[0]); ++j)
                    m_registers[i][j] = 0;

            m_soundPlayed = m_valueRecovered = false;
            m_mostRecentSndValue = m_firstRecoveryValue = 0;

            while (!m_interProcessQueue[0].empty()) m_interProcessQueue[0].pop();
            while (!m_interProcessQueue[1].empty()) m_interProcessQueue[1].pop();
            m_numberOfSends = 0;
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
            case Add: setRegister(instruction, firstOperand + secondOperand, processId);
                logTwoOperandExecution("add", firstOperand, secondOperand, processId);
                break;
            case Mul: setRegister(instruction, firstOperand * secondOperand, processId);
                logTwoOperandExecution("mul", firstOperand, secondOperand, processId);
                break;
            case Mod: setRegister(instruction, firstOperand % secondOperand, processId);
                logTwoOperandExecution("mod", firstOperand, secondOperand, processId);
                break;
            case Snd:
                if (multiProcess)
                {
                    m_interProcessQueue[processId ? 0 : 1].push(firstOperand);
                    if (processId == 1) ++m_numberOfSends;
                }
                if (!multiProcess)
                {
                    m_mostRecentSndValue = firstOperand; m_soundPlayed = true;
                }
                logOneOperandExecution("snd", firstOperand, processId);
                break;
            case Rcv:
                if (multiProcess)
                {
                    if (m_interProcessQueue[processId].empty()) --programCounter;
                    if (!m_interProcessQueue[processId].empty())
                    {
                        setRegister(instruction, m_interProcessQueue[processId].front(), processId);
                        m_interProcessQueue[processId].pop();
                    }
                }
                if (!multiProcess && m_soundPlayed && firstOperand != 0)
                {
                    m_firstRecoveryValue = m_mostRecentSndValue; m_valueRecovered = true;
                }
                logOneOperandExecution("rcv", firstOperand, processId);
                break;
            case Jgz:
                if (firstOperand > 0 && (secondOperand < 0 || secondOperand > 1))
                    --programCounter += secondOperand;
                logTwoOperandExecution("jgz", firstOperand, secondOperand, processId);
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
        int64_t m_registers[26][2];
        bool m_soundPlayed;
        int64_t m_mostRecentSndValue;
        bool m_valueRecovered;
        int64_t m_firstRecoveryValue;

        std::queue<int64_t> m_interProcessQueue[2];
        unsigned m_numberOfSends;
    };
}
